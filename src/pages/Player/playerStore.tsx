import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import playerReducer, {
  toServer,
  fromServer,
  setStatus,
  newMessage,
  setTimeElapsed,
  setBoard,
  timesUp,
  sendBoard,
} from './playerReducer'
import { ConnectionMode } from '../../common/constants'
import * as signalR from '@microsoft/signalr'
import {
  checkOnReceiveMessage,
  checkOnRoom,
  checkOnTimerElapsed,
} from '../../common/typeGuards'

// Builds the SignalR connection, mapping it to /chathub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:5001/chathub')
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build()

/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function startPlayerConnection(): Promise<void> {
  try {
    await hubConnection.start()
    console.log('***** PLAYER connected *****')
    store.dispatch(setStatus(ConnectionMode.Connected))

    hubConnection.on(fromServer.receiveMessage, (msg) => {
      checkOnReceiveMessage(msg)
      store.dispatch(newMessage(msg))
    })

    hubConnection.on(fromServer.onTimerElapsed, (timeElapsed) => {
      checkOnTimerElapsed(timeElapsed)
      store.dispatch(setTimeElapsed(timeElapsed))
    })

    hubConnection.on(fromServer.onJoinRoom, (gameRoom) => {
      checkOnRoom(gameRoom)
      store.dispatch(setBoard(gameRoom))
    })

    hubConnection.on(fromServer.onTimesUp, () => {
      store.dispatch(timesUp())
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
  hubConnection.stop()
  store.dispatch(setStatus(ConnectionMode.Disconnected))
}

/**
 *   MIDDLEWARE - add singnalR 'invoke' here
 */
export const homeMadeMiddleware: Middleware = (store) => (next) => async (action) => {
  console.log('...Middleware...')

  if (action.type === toServer.JoinRoom) {
    hubConnection.invoke(
      toServer.JoinRoom,
      action.payload.roomId,
      action.payload.playerName
    )
  }

  if (action.type === toServer.SendMessage) {
    hubConnection.invoke(
      toServer.SendMessage,
      action.payload.roomId,
      action.payload.message
    )
  }

  // this method needs to reach the reducer
  if (action.type === sendBoard.type) {
    hubConnection.invoke(toServer.SendBoard, action.payload.roomId, action.payload.board)
  }

  console.log(store.getState)

  return next(action)
}

/**
 *   STORE
 */
const store = configureStore({
  reducer: {
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeMadeMiddleware).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type PlayerState = ReturnType<typeof store.getState>

export default store
