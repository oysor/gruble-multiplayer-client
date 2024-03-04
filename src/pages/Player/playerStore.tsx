import { configureStore, isAnyOf } from '@reduxjs/toolkit'
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
  receiveResults,
  addPlayer,
  removePlayer,
  newServerMessage,
  sendMessage,
  joinRoom,
} from './playerReducer'
import { API_URL, ConnectionMode } from '../../common/constants'
import * as signalR from '@microsoft/signalr'
import {
  checkOnReceiveMessage,
  checkOnRoom,
  checkOnTimerElapsed,
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
export async function startPlayerConnection(): Promise<void> {
  try {
    if (hubConnection.state === HubConnectionState.Disconnected) {
      await hubConnection.start()
    } else {
      return
    }
    store.dispatch(setStatus(hubConnection.state))
    console.log('***** PLAYER ' + hubConnection.state + ' *****')

    hubConnection.on(fromServer.receiveMessage, (msg, connectionID) => {
      // checkOnReceiveMessage(msg)
      console.log('receiveMessage')
      store.dispatch(newMessage({ id: connectionID, message: msg }))
    })

    hubConnection.on(fromServer.onTimerElapsed, (timeElapsed) => {
      checkOnTimerElapsed(timeElapsed)
      store.dispatch(setTimeElapsed(timeElapsed))
    })

    hubConnection.on(fromServer.onJoinRoom, (gameRoom, msg) => {
      console.log('Player JOINED')
      store.dispatch(setBoard(gameRoom))
      // checkOnRoom(gameRoom)
      //   ? store.dispatch(setBoard(gameRoom))
      //   : store.dispatch(newServerMessage(msg))
    })

    hubConnection.on(fromServer.onPlayerJoined, (player) => {
      // spiller legger til seg selv også?
      console.log('SPILLEREN ')
      console.log(player)
      store.dispatch(addPlayer(player))
    })

    hubConnection.on(fromServer.onPlayerLeft, (player) => {
      store.dispatch(removePlayer(player))
    })

    hubConnection.on(fromServer.onTimesUp, () => {
      store.dispatch(timesUp())
    })

    hubConnection.on(fromServer.receiveResults, (results) => {
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
  hubConnection.stop()
  store.dispatch(setStatus(ConnectionMode.Disconnected))
}

/**
 *   MIDDLEWARE - add singnalR 'invoke' here
 */
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
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
      toServer.JoinRoom,
      action.payload.roomId,
      action.payload.playerName
    )
  },
})

startAppListening({
  actionCreator: sendMessage,
  effect: async (action) => {
    hubConnection.invoke(
      toServer.SendMessage,
      action.payload.roomId,
      action.payload.message
    )
  },
})

startAppListening({
  actionCreator: sendBoard,
  effect: async (action) => {
    hubConnection.invoke(toServer.SendBoard, action.payload.roomId, action.payload.board)
  },
})

/**
 *   MIDDLEWARE - add singnalR 'invoke' here
 */
// export const homeMadeMiddleware: Middleware =
//   (store) => (next) => async (action: any) => {
// if (action.type === toServer.JoinRoom) {
//   hubConnection.invoke(
//     toServer.JoinRoom,
//     action.payload.roomId,
//     action.payload.playerName
//   )
// }

// if (action.type === toServer.SendMessage) {
//   hubConnection.invoke(
//     toServer.SendMessage,
//     action.payload.roomId,
//     action.payload.message
//   )
// }

// this method needs to reach the reducer
// if (action.type === sendBoard.type) {
//   hubConnection.invoke(
//     toServer.SendBoard,
//     action.payload.roomId,
//     action.payload.board
//   )
// }

//     if (process.env.NODE_ENV !== 'production') {
//       console.log(store.getState)
//     }

//     return next(action)
//   }

/**
 *   STORE
 */
const store = configureStore({
  reducer: {
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type PlayerState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
