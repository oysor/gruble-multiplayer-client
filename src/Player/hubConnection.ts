import { isAnyOf } from '@reduxjs/toolkit'
import {
  setStatus,
  newMessage,
  setTimeElapsed,
  addGameRoom,
  timesUp,
  sendBoard,
  receiveResults,
  addPlayer,
  removePlayer,
  newServerMessage,
  sendMessage,
  joinRoom,
  resetState,
  gameClosed,
  setRoundIsOn,
} from './reducer'
import { API_URL, ConnectionMode } from '../common/constants'
import * as signalR from '@microsoft/signalr'
import { HubConnectionState } from '@microsoft/signalr'
import { startAppListening } from './listenerMiddleware'
import store from './store'

// send to server
enum toServer {
  SEND_MESSAGE = 'SendMessage',
  JOINROOM = 'JoinRoom',
  SENDBOARD = 'SendBoard',
}
// receive from server
enum fromServer {
  ON_MESSAGE_RECEIVED = 'onMessageReceived',
  ON_SERVER_REPLY = 'onServerReply',
  ON_ROOM_JOINED = 'onRoomJoined',
  ON_PLAYER_JOINED = 'onPlayerJoined',
  ON_PLAYER_DISCONNECTED = 'onPlayerLeft',
  ON_TIMER_STARTED = 'onTimerStarted',
  ON_TIMER_ELAPSED = 'onTimerElapsed',
  ON_TIMER_FINISHED = 'onTimerFinished',
  ON_RECEIVE_RESULTS = 'onReceiveResults',
  ON_GAME_ROOM_DISCONNECT = 'onGameRoomDisconnect',
  ON_ERROR = 'onError',
}

// Builds the SignalR connection, mapping it to /gameHub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(API_URL, { withCredentials: false })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Debug)
  .build()

/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function startPlayerConnection(): Promise<void> {
  try {
    if (hubConnection.state === HubConnectionState.Disconnected) {
      await hubConnection.start()
    } else {
      return
    }
    store.dispatch(setStatus(hubConnection.state))
    console.log('***** PLAYER ' + hubConnection.state + ' *****')

    hubConnection.on(fromServer.ON_ERROR, (msg) => {
      store.dispatch(newServerMessage({ message: msg }))
    })

    hubConnection.on(fromServer.ON_SERVER_REPLY, (msg) => {
      store.dispatch(newServerMessage({ message: msg }))
    })

    hubConnection.on(fromServer.ON_MESSAGE_RECEIVED, (msg, connectionID) => {
      store.dispatch(newMessage({ id: connectionID, message: msg }))
    })

    hubConnection.on(fromServer.ON_ROOM_JOINED, (gameRoom, msg) => {
      store.dispatch(addGameRoom(gameRoom))
    })
    hubConnection.on(fromServer.ON_GAME_ROOM_DISCONNECT, () => {
      store.dispatch(gameClosed())
    })

    hubConnection.on(fromServer.ON_PLAYER_JOINED, (player) => {
      store.dispatch(addPlayer(player))
    })

    hubConnection.on(fromServer.ON_PLAYER_DISCONNECTED, (usedId) => {
      store.dispatch(removePlayer({ userId: usedId }))
    })

    hubConnection.on(fromServer.ON_TIMER_STARTED, () => {
      store.dispatch(setRoundIsOn())
    })

    hubConnection.on(fromServer.ON_TIMER_ELAPSED, (timeElapsed) => {
      store.dispatch(setTimeElapsed(timeElapsed))
    })

    hubConnection.on(fromServer.ON_TIMER_FINISHED, () => {
      store.dispatch(timesUp())
    })

    hubConnection.on(fromServer.ON_RECEIVE_RESULTS, (results) => {
      store.dispatch(receiveResults(results))
    })
  } catch (err) {
    console.log(err)
    console.log('***** Connection FAILED ******')
    store.dispatch(setStatus(ConnectionMode.Failed))
    setTimeout(startPlayerConnection, 5000)
  }
}

// hubConnection.onclose(startPlayerConnection);

hubConnection.onreconnecting((error) => {
  console.log('Connection lost due to error ' + { error } + '. Reconnecting')
  store.dispatch(setStatus(ConnectionMode.Reconnecting))
})

hubConnection.onreconnected((error) => {
  console.log('Reconnected! ' + error)
  store.dispatch(setStatus(ConnectionMode.Connected))
})

export async function stopPlayerConnection(): Promise<void> {
  if (hubConnection.state === HubConnectionState.Connected) {
    store.dispatch(resetState())
    hubConnection.stop().then(() => {
      console.log('Player logged out')
    })
  }
}

/**
 * * * * * * * * * *
 *   MIDDLEWARE - add singnalR 'invoke' here
 *   Messages to the server goes here.
 *
 *  Add one or more listener entries that look for specific actions.
 *  They may contain any sync or async logic, similar to thunks.
 */

startAppListening({
  matcher: isAnyOf(sendMessage, sendBoard, joinRoom),
  effect: async (action, listenerApi) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getOriginalState')
      console.log(listenerApi.getOriginalState())
    }
  },
})

startAppListening({
  actionCreator: joinRoom,
  effect: async (action) => {
    hubConnection.invoke(
      toServer.JOINROOM,
      action.payload.roomId,
      action.payload.playerName
    )
  },
})

startAppListening({
  actionCreator: sendMessage,
  effect: async (action) => {
    hubConnection.invoke(
      toServer.SEND_MESSAGE,
      action.payload.roomId,
      action.payload.message
    )
  },
})

startAppListening({
  actionCreator: sendBoard,
  effect: async (action) => {
    const signalRGroupName = action.payload.roomId
    hubConnection.invoke(toServer.SENDBOARD, signalRGroupName, action.payload.board)
  },
})
/* * * * * * * * * * **/
