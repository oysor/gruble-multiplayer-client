import { isAnyOf } from '@reduxjs/toolkit'

import {
  setStatus,
  newMessage,
  setTimeElapsed,
  removePlayer,
  addPlayer,
  timesUp,
  receiveBoards,
  createRoom,
  startGame,
  setPlayerResults,
  resetState,
  addGameRoom,
  setRoundIsOn,
} from './reducer'
import { API_URL, ConnectionMode } from '../common/constants'
import * as signalR from '@microsoft/signalr'
import { HubConnectionState } from '@microsoft/signalr'
import { startAppListening } from './listenerMiddleware'
import store from './store'

// send to server
enum toServer {
  CREATE_ROOM = 'CreateRoom',
  START_GAME = 'StartGame',
  SEND_RESULTS = 'SendResults',
}

// receive from server
enum fromServer {
  ON_MESSAGE_RECEIVED = 'onMessageReceived',
  ON_GAME_CREATED = 'onGameCreated',
  ON_GAME_CREATION_ERROR = 'onRoomCreationError',
  ON_PLAYER_JOINED = 'onPlayerJoined',
  ON_PLAYER_DISCONNECTED = 'onPlayerLeft',
  ON_TIMER_STARTED = 'onTimerStarted',
  ON_TIMER_ELAPSED = 'onTimerElapsed',
  ON_TIMER_FINISHED = 'onTimerFinished',
  ON_RECEIVE_BOARDS = 'onReceiveBoards',
}

// Builds the SignalR connection, mapping it to /chathub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(API_URL, { withCredentials: false })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Debug)
  .build()

/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function startRoomConnection(): Promise<void> {
  try {
    if (hubConnection.state === HubConnectionState.Disconnected) {
      await hubConnection.start()
    } else {
      return
    }

    store.dispatch(setStatus(hubConnection.state))
    console.log('***** ROOM ' + hubConnection.state + ' *****')

    // Receive newly created room object here.
    hubConnection.on(fromServer.ON_GAME_CREATED, (gameRoom) => {
      store.dispatch(addGameRoom(gameRoom))
    })

    hubConnection.on(fromServer.ON_PLAYER_JOINED, (player) => {
      store.dispatch(addPlayer(player))
    })

    hubConnection.on(fromServer.ON_PLAYER_DISCONNECTED, (usedId) => {
      store.dispatch(removePlayer({ userId: usedId }))
    })

    hubConnection.on(fromServer.ON_MESSAGE_RECEIVED, (msg, connectionID) => {
      store.dispatch(newMessage({ id: connectionID, message: msg }))
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

    hubConnection.on(fromServer.ON_RECEIVE_BOARDS, (userId, board) => {
      store.dispatch(receiveBoards({ userId: userId, board: board }))
    })
  } catch (err) {
    console.log(err)
    console.log('***** Connection FAILED ******')
    store.dispatch(setStatus(ConnectionMode.Failed))
    setTimeout(startRoomConnection, 5000)
  }
}

// hubConnection.onclose(startRoomConnection);

hubConnection.onreconnecting((error) => {
  console.log('Connection lost due to error ' + { error } + '. Reconnecting')
  store.dispatch(setStatus(ConnectionMode.Reconnecting))
})

hubConnection.onreconnected((error) => {
  console.log('Reconnected! ' + error)
  store.dispatch(setStatus(ConnectionMode.Connected))
})

export async function stopRoomConnection(): Promise<void> {
  if (hubConnection.state === HubConnectionState.Connected) {
    store.dispatch(resetState())
    hubConnection.stop().then(() => {
      console.log('Room closed.')
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
  matcher: isAnyOf(createRoom, startGame, setPlayerResults),
  effect: async (action, listenerApi) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getOriginalState')
      console.log(listenerApi.getOriginalState())
    }
  },
})

startAppListening({
  actionCreator: createRoom,
  effect: async (action) => {
    hubConnection.invoke(toServer.CREATE_ROOM, action.payload)
  },
})

startAppListening({
  actionCreator: startGame,
  effect: async (action) => {
    console.log('Ask server to Start Game')
    await hubConnection.invoke(toServer.START_GAME, action.payload.roomId)
    console.log('Game ended')
  },
})

startAppListening({
  actionCreator: setPlayerResults,
  effect: async (action) => {
    // Run whatever additional side-effect-y logic you want here
    hubConnection.invoke(toServer.SEND_RESULTS, action.payload)
  },
})

/* * * * * * * * * * **/
