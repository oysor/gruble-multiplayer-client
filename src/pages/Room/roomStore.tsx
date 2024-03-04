import { configureStore, isAnyOf } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import roomReducer, {
  toServer,
  fromServer,
  setStatus,
  setRoom,
  newMessage,
  setTimeElapsed,
  removePlayer,
  addPlayer,
  timesUp,
  receiveBoards,
  createRoom,
  startGame,
  setPlayerResults,
} from './roomReducer'
import { API_URL, ConnectionMode } from '../../common/constants'
import * as signalR from '@microsoft/signalr'
import {
  checkOnNewPlayer,
  checkOnReceiveMessage,
  checkOnRoom,
  checkOnTimerElapsed,
  checkPlayerList,
} from '../../common/typeGuards'
import { HubConnectionState } from '@microsoft/signalr'
import { listenerMiddleware, startAppListening } from './listenerMiddleware'

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

    hubConnection.on(fromServer.onCreateRoom, (gameRoom) => {
      checkOnRoom(gameRoom)
      store.dispatch(setRoom(gameRoom))
    })

    hubConnection.on(fromServer.onPlayerJoined, (player) => {
      // checkOnNewPlayer(player)
      store.dispatch(addPlayer(player))
    })

    hubConnection.on(fromServer.onPlayerLeft, (player) => {
      checkOnNewPlayer(player)
      store.dispatch(removePlayer(player))
    })

    hubConnection.on(fromServer.ReceiveMessage, (msg, connectionID) => {
      checkOnReceiveMessage(msg)
      store.dispatch(newMessage({ id: connectionID, message: msg }))
    })

    hubConnection.on(fromServer.onTimerElapsed, (timeElapsed) => {
      checkOnTimerElapsed(timeElapsed)
      store.dispatch(setTimeElapsed(timeElapsed))
    })

    hubConnection.on(fromServer.onTimesUp, () => {
      store.dispatch(timesUp())
    })

    hubConnection.on(fromServer.ReceiveBoards, (playerList) => {
      checkPlayerList(playerList)
      store.dispatch(receiveBoards(playerList))
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
  hubConnection.stop()
  store.dispatch(setStatus(ConnectionMode.Disconnected))
}

/**
 *   MIDDLEWARE - add singnalR 'invoke' here
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

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
startAppListening({
  actionCreator: createRoom,
  effect: async (action) => {
    hubConnection.invoke(toServer.CreateRoom, action.payload)
  },
})

startAppListening({
  actionCreator: startGame,
  effect: async (action) => {
    console.log('Ask server to Start Game')
    hubConnection.invoke(toServer.StartGame, action.payload.roomId)
  },
})

startAppListening({
  actionCreator: setPlayerResults,
  effect: async (action) => {
    // Run whatever additional side-effect-y logic you want here
    hubConnection.invoke(toServer.SendResults, action.payload)
  },
})

/**
 *   STORE
 */
const store = configureStore({
  reducer: {
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RoomState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
