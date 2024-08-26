import { isAnyOf } from '@reduxjs/toolkit'

import {
  updateConnectionStatus,
  addMessage,
  updateTimeElapsed,
  removePlayer,
  addPlayer,
  playerBoard,
  createRoom,
  startGame,
  playerResults,
  resetState,
  roomSettings,
  // userId,
  updateConnection,
  updateRoomStatus,
} from './reducer'
import { API_URL, ConnectionMode, RoomStatus } from '../common/constants'
import * as signalR from '@microsoft/signalr'
import { HubConnectionState } from '@microsoft/signalr'
import { startAppListening } from './listenerMiddleware'
import store from './store'

// send to server
enum toServer {
  CREATE_ROOM = 'CreateRoom',
  START_GAME = 'StartGame',
  SEND_RESULTS = 'SendResults',
  UPDATE_CONNECTION = 'UpdateConnection',
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

// Builds the SignalR connection, mapping it to /gameHub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(API_URL, { withCredentials: false })
  // .withStatefulReconnect({ bufferSize: 1000 }) // Optional, defaults to 100,000
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Debug)
  .build()

/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function startRoomConnection(): Promise<void> {
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

    console.log('***** ROOM ' + hubConnection.state + ' *****')

    // Receive newly created room object here.
    hubConnection.on(fromServer.ON_GAME_CREATED, (room) => {
      store.dispatch(roomSettings(room))
    })

    hubConnection.on(fromServer.ON_PLAYER_JOINED, (player) => {
      store.dispatch(addPlayer(player))
    })

    hubConnection.on(fromServer.ON_PLAYER_DISCONNECTED, (usedId) => {
      store.dispatch(removePlayer({ userId: usedId }))
    })

    hubConnection.on(fromServer.ON_MESSAGE_RECEIVED, (msg, connectionID) => {
      store.dispatch(addMessage({ id: connectionID, message: msg }))
    })

    hubConnection.on(fromServer.ON_TIMER_STARTED, () => {
      store.dispatch(updateRoomStatus(RoomStatus.roundStarted))
    })

    hubConnection.on(fromServer.ON_TIMER_ELAPSED, (timeElapsed) => {
      store.dispatch(updateTimeElapsed(timeElapsed))
    })

    hubConnection.on(fromServer.ON_TIMER_FINISHED, () => {
      store.dispatch(updateRoomStatus(RoomStatus.roundEnded))
    })

    hubConnection.on(fromServer.ON_RECEIVE_BOARDS, (userId, board) => {
      store.dispatch(playerBoard({ userId: userId, board: board }))
    })
  } catch (err) {
    console.assert(
      hubConnection.state === signalR.HubConnectionState.Disconnected,
      'Not connected.'
    )
    console.log('***** Connection FAILED ******')
    console.log(err)
    store.dispatch(updateConnectionStatus(ConnectionMode.Failed))
    setTimeout(() => startRoomConnection(), 5000)
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
  matcher: isAnyOf(createRoom, startGame, playerResults),
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
  actionCreator: playerResults,
  effect: async (action) => {
    // Run whatever additional side-effect-y logic you want here
    hubConnection.invoke(toServer.SEND_RESULTS, action.payload)
  },
})

startAppListening({
  actionCreator: updateConnection,
  effect: async (action, listenerApi) => {
    console.log(listenerApi.getOriginalState())

    const state = listenerApi.getOriginalState().room
    const userId = state.userId
    const roomId = state.roomId

    console.log('user: ' + userId + ' room: ' + roomId)

    if (userId !== '') {
      hubConnection.invoke(toServer.UPDATE_CONNECTION, userId, roomId)
    }
  },
})

/* * * * * * * * * * **/
