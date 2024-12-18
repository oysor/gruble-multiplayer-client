import { isAnyOf } from '@reduxjs/toolkit'
import {
  updateConnectionStatus,
  addMessage,
  updateTimer,
  joinedRoom,
  dispatchBoard,
  receivedResults,
  addPlayer,
  removePlayer,
  serverMessage,
  sendMessage,
  joinRoom,
  resetState,
  gameClosed,
  updateConnection,
  roomUpdated,
  checkRoom,
  startRound,
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
  CHECK_ROOMSTATUS = 'CheckRoomStatus',
  SENDBOARD = 'SendBoard',
  UPDATE_CONNECTION = 'UpdateConnection',
}
// receive from server
enum fromServer {
  ON_MESSAGE_RECEIVED = 'onMessageReceived',
  ON_SERVER_REPLY = 'onServerReply',
  ON_ROOM_JOINED = 'onRoomJoined',
  ON_RECEIVED_SETTINGS = 'onReceivedSettings',
  ON_PLAYER_JOINED = 'onPlayerJoined',
  ON_PLAYER_DISCONNECTED = 'onPlayerLeft',
  ON_TIMER_STARTED = 'onTimerStarted',
  ON_TIMER_ELAPSED = 'onTimerElapsed',
  ON_TIMER_FINISHED = 'onTimerFinished',
  ON_RECEIVE_RESULTS = 'onReceiveResults',
  ON_ROOM_DISCONNECT = 'onGameRoomDisconnect',
  ON_ERROR = 'onError',
}

// Builds the SignalR connection, mapping it to /gameHub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(API_URL, { withCredentials: false })
  // .withStatefulReconnect({ bufferSize: 1000 })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Debug)
  .build()

/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function startPlayerConnection(): Promise<void> {
  try {
    await hubConnection.start()
    console.assert(
      hubConnection.state === signalR.HubConnectionState.Connected,
      'Not connected.'
    )

    console.log(
      `*** Connection established. Connected with connectionId "${hubConnection.connectionId}". ***`
    )

    store.dispatch(updateConnectionStatus(hubConnection.state))

    console.log('***** PLAYER ' + hubConnection.state + ' *****')

    hubConnection.on(fromServer.ON_ERROR, (msg) => {
      store.dispatch(serverMessage({ message: msg }))
    })

    hubConnection.on(fromServer.ON_SERVER_REPLY, (msg) => {
      store.dispatch(serverMessage({ message: msg }))
    })

    hubConnection.on(fromServer.ON_MESSAGE_RECEIVED, (msg, connectionID) => {
      store.dispatch(addMessage({ id: connectionID, message: msg }))
    })

    hubConnection.on(fromServer.ON_ROOM_JOINED, (gameRoom, userId) => {
      store.dispatch(joinedRoom({ room: gameRoom, userId: userId }))
    })

    hubConnection.on(fromServer.ON_RECEIVED_SETTINGS, (room) => {
      store.dispatch(roomUpdated(room))
    })

    hubConnection.on(fromServer.ON_ROOM_DISCONNECT, () => {
      store.dispatch(gameClosed())
    })

    hubConnection.on(fromServer.ON_PLAYER_JOINED, (player) => {
      store.dispatch(addPlayer(player))
    })

    hubConnection.on(fromServer.ON_PLAYER_DISCONNECTED, (usedId) => {
      store.dispatch(removePlayer({ userId: usedId }))
    })

    hubConnection.on(fromServer.ON_TIMER_STARTED, () => {
      store.dispatch(startRound())
    })

    hubConnection.on(fromServer.ON_TIMER_ELAPSED, (timeElapsed) => {
      store.dispatch(updateTimer(timeElapsed))
    })

    hubConnection.on(fromServer.ON_TIMER_FINISHED, () => {
      store.dispatch(dispatchBoard())
    })

    hubConnection.on(fromServer.ON_RECEIVE_RESULTS, (results) => {
      store.dispatch(receivedResults(results))
    })
  } catch (err) {
    console.assert(
      hubConnection.state === signalR.HubConnectionState.Disconnected,
      'Not connected.'
    )
    console.log('***** Connection FAILED ******')
    console.log(err)
    store.dispatch(updateConnectionStatus(ConnectionMode.Failed))
    setTimeout(() => startPlayerConnection(), 5000)
  }
}

hubConnection.onreconnecting((error) => {
  console.assert(hubConnection.state === signalR.HubConnectionState.Reconnecting)
  const reconnectingMessage = `Connection lost due to error "${error}". Reconnecting.`

  console.log(reconnectingMessage)
  store.dispatch(updateConnectionStatus(ConnectionMode.Reconnecting))
})

hubConnection.onreconnected((connectionId) => {
  console.assert(hubConnection.state === signalR.HubConnectionState.Connected)
  const reconnectedMessage = `*** Connection REESTABLISHED. Connected with connectionId "${connectionId}". ***`
  console.log(reconnectedMessage)
  store.dispatch(updateConnectionStatus(ConnectionMode.Connected))
  store.dispatch(updateConnection())
})

hubConnection.onclose((error) => {
  console.assert(hubConnection.state === signalR.HubConnectionState.Disconnected)
  const onClosedMessage = `Connection closed due to error "${error}". Try refreshing this page to restart the connection.`

  console.log(onClosedMessage)
  store.dispatch(updateConnectionStatus(ConnectionMode.Disconnected))
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
  matcher: isAnyOf(sendMessage, dispatchBoard, joinRoom),
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
  actionCreator: checkRoom,
  effect: async (action) => {
    await hubConnection.invoke(toServer.CHECK_ROOMSTATUS, action.payload.roomId)
  },
})

startAppListening({
  actionCreator: updateConnection,
  effect: async (action, listenerApi) => {
    console.log(listenerApi.getOriginalState())

    const state = listenerApi.getOriginalState().player
    const userId = state.userId
    const roomId = state.roomId

    if (userId !== '') {
      hubConnection.invoke(toServer.UPDATE_CONNECTION, userId, roomId)
    }
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
  actionCreator: dispatchBoard,
  effect: async (action, listenerApi) => {
    // const signalRGroupName = action.payload.roomId
    const player = listenerApi.getOriginalState().player
    hubConnection.invoke(toServer.SENDBOARD, player.roomId, player.playerBoard)
  },
})
/* * * * * * * * * * **/
