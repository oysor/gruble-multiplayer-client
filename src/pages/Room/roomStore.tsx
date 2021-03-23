import { configureStore, Middleware } from '@reduxjs/toolkit'
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

// Builds the SignalR connection, mapping it to /chathub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(API_URL, { withCredentials: false })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build()

/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function startRoomConnection(): Promise<void> {
  try {
    await hubConnection.start()
    console.log('***** ROOM connected *****')
    store.dispatch(setStatus(ConnectionMode.Connected))

    hubConnection.on(fromServer.onCreateRoom, (gameRoom) => {
      checkOnRoom(gameRoom)
      store.dispatch(setRoom(gameRoom))
    })

    hubConnection.on(fromServer.onPlayerJoined, (player) => {
      checkOnNewPlayer(player)
      store.dispatch(addPlayer(player))
    })

    hubConnection.on(fromServer.onPlayerLeft, (player) => {
      checkOnNewPlayer(player)
      store.dispatch(removePlayer(player))
    })

    hubConnection.on(fromServer.ReceiveMessage, (msg) => {
      checkOnReceiveMessage(msg)
      store.dispatch(newMessage(msg))
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
export const homeMadeMiddleware: Middleware = (store) => (next) => async (action) => {
  console.log('...Middleware...')

  if (action.type === toServer.CreateRoom) {
    hubConnection.invoke(toServer.CreateRoom, action.payload)
  }

  if (action.type === toServer.StartGame) {
    hubConnection.invoke(toServer.StartGame, action.payload)
  }
  /**
   * Sends the updated playerList to the hub.
   */
  if (action.type === 'room/setPlayerResults') {
    hubConnection.invoke(toServer.SendResults, action.payload)
  }

  console.log(store.getState)

  return next(action)
}

/**
 *   STORE
 */
const store = configureStore({
  reducer: {
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeMadeMiddleware).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RoomState = ReturnType<typeof store.getState>

export default store
