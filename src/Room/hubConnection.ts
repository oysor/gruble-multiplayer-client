import { isAnyOf } from '@reduxjs/toolkit'

import {
  updateConnectionStatus,
  addMessage,
  updateTimeElapsed,
  removePlayer,
  addPlayer,
  receivePlayerBoard,
  createRoom,
  startGame,
  dispatchResults,
  resetState,
  roomUpdated,
  updateConnection,
  roomCreated,
  updateTimeLimit,
  updateBoardSettings,
  roundStarted,
  roundEnded,
} from './reducer'
import {
  API_URL,
  ConnectionMode,
  DispatchResults,
  IncomingGameRoom,
  IncomingMessage,
  IncomingPlayer,
  IncomingPlayerBoard,
  IncomingUserId,
  UpdateBoardSettings,
} from '../common/constants'
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
  UPDATE_SETTINGS = 'UpdateSettings',
}

// receive from server
enum fromServer {
  ON_MESSAGE_RECEIVED = 'onMessageReceived',
  ON_ROOM_CREATED = 'onRoomCreated',
  ON_RECEIVED_SETTINGS = 'onReceivedSettings',
  ON_GAME_CREATION_ERROR = 'onRoomCreationError',
  ON_PLAYER_JOINED = 'onPlayerJoined',
  ON_PLAYER_DISCONNECTED = 'onPlayerLeft',
  ON_TIMER_STARTED = 'onTimerStarted',
  ON_TIMER_ELAPSED = 'onTimerElapsed',
  ON_TIMER_FINISHED = 'onTimerFinished',
  ON_RECEIVED_BOARD = 'onReceivedBoard',
}

// Builds the SignalR connection, mapping it to /gameHub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(API_URL, { withCredentials: false })
  .withStatefulReconnect({ bufferSize: 1000 }) // Optional, defaults to 100,000
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
    hubConnection.on(fromServer.ON_ROOM_CREATED, (room: IncomingGameRoom) => {
      store.dispatch(roomCreated(room))
    })

    hubConnection.on(fromServer.ON_RECEIVED_SETTINGS, (room: IncomingGameRoom) => {
      store.dispatch(roomUpdated(room))
    })

    hubConnection.on(fromServer.ON_PLAYER_JOINED, (player: IncomingPlayer) => {
      store.dispatch(addPlayer(player))
    })

    hubConnection.on(fromServer.ON_PLAYER_DISCONNECTED, (userId: IncomingUserId) => {
      store.dispatch(removePlayer(userId))
    })

    hubConnection.on(fromServer.ON_MESSAGE_RECEIVED, (message: IncomingMessage) => {
      store.dispatch(addMessage(message))
    })

    hubConnection.on(fromServer.ON_TIMER_STARTED, () => {
      store.dispatch(roundStarted())
    })

    hubConnection.on(fromServer.ON_TIMER_ELAPSED, (elapsedTime: number) => {
      store.dispatch(updateTimeElapsed(elapsedTime))
    })

    hubConnection.on(fromServer.ON_TIMER_FINISHED, () => {
      store.dispatch(roundEnded())
    })

    hubConnection.on(fromServer.ON_RECEIVED_BOARD, (playerBoard: IncomingPlayerBoard) => {
      store.dispatch(receivePlayerBoard(playerBoard))
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
  matcher: isAnyOf(createRoom, startGame, dispatchResults),
  effect: async (action, listenerApi) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getOriginalState')
      console.log(listenerApi.getOriginalState())
    }
  },
})

startAppListening({
  actionCreator: createRoom,
  effect: async (action, listenerApi) => {
    const requestObject = { RoomName: action.payload }
    hubConnection.invoke(toServer.CREATE_ROOM, requestObject)
  },
})

startAppListening({
  matcher: isAnyOf(updateTimeLimit, updateBoardSettings),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effect: async (action: { type: any; payload: UpdateBoardSettings }, listenerApi) => {
    const room = listenerApi.getOriginalState().room
    const { roomId, timeLimit, boardSettings } = room

    const gameSettings = {
      TimeLimit: timeLimit,
      BoardSettings: {
        Categories: boardSettings?.categories,
        Letters: boardSettings?.letters,
      },
    }

    let updateSettings = false

    if (action.type == updateTimeLimit.toString()) {
      gameSettings.TimeLimit = action.payload.timeLimit
      updateSettings = true
    }

    if (action.type == updateBoardSettings.toString()) {
      gameSettings.BoardSettings.Categories = action.payload.categories
      gameSettings.BoardSettings.Letters = action.payload.letters
      updateSettings = true
    }

    if (updateSettings) {
      hubConnection.invoke(toServer.UPDATE_SETTINGS, roomId, gameSettings)
    }
  },
})

startAppListening({
  actionCreator: startGame,
  effect: async (action, listenerApi) => {
    console.log('Ask server to Start Game')

    const room = listenerApi.getOriginalState().room

    const { roomId, roomName, timeLimit, boardSettings } = room

    const gameSettings = {
      RoomName: roomName,
      TimeLimit: timeLimit,
      BoardSettings: {
        Categories: boardSettings.categories,
        Letters: boardSettings.letters,
      },
    }

    await hubConnection.invoke(toServer.START_GAME, roomId, gameSettings)
  },
})

startAppListening({
  actionCreator: dispatchResults,
  effect: async (action: { payload: DispatchResults }) => {
    // Run whatever additional side-effect-y logic you want here
    const { playerList, boardDictionary } = action.payload
    const resultsDto = {
      Players: playerList,
      BoardDictionary: boardDictionary,
    }

    console.log(JSON.stringify(resultsDto))

    hubConnection.invoke(toServer.SEND_RESULTS, resultsDto)
  },
})

startAppListening({
  actionCreator: updateConnection,
  effect: async (action, listenerApi) => {
    console.log(listenerApi.getOriginalState())

    const state = listenerApi.getOriginalState().room
    const userId = state.userId
    const roomId = state.roomId
    const gameState = state.gameState
    const updateDto = { userId, roomId, gameState }

    if (userId !== '') {
      hubConnection.invoke(toServer.UPDATE_CONNECTION, updateDto)
    }
  },
})
