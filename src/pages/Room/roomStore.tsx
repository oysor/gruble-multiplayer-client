import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import roomReducer, { toServer, fromServer, setStatus, roomCreated, newMessage, setTimeElapsed } from './roomReducer'
import { ConnectionMode } from '../../common/constants/status'
import * as signalR from "@microsoft/signalr";

// Builds the SignalR connection, mapping it to /chathub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/chathub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();


/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function startRoomConnection(): Promise<void> {
  try {
    await hubConnection.start();
    console.log("***** ROOM connected *****");
    store.dispatch(setStatus(ConnectionMode.Connected))

    hubConnection.on(fromServer.onCreateRoom, (msg) => {
      store.dispatch(roomCreated(msg))
    })

    hubConnection.on(fromServer.onPlayerJoined, (msg) => {
      store.dispatch(newMessage(msg))
    })

    hubConnection.on(fromServer.ReceiveMessage, (msg) => {
      store.dispatch(newMessage(msg))
    })

    hubConnection.on(fromServer.onTimerElapsed, (timeElapsed) => {
      store.dispatch(setTimeElapsed(timeElapsed))
    })

  } catch (err) {
    console.log(err);
    console.log("***** Connection FAILED ******");
    store.dispatch(setStatus(ConnectionMode.Failed))
    setTimeout(startRoomConnection, 5000);
  }
}

// hubConnection.onclose(startRoomConnection);

hubConnection.onreconnecting(error => {
  console.log("Connection lost due to error " + { error } + ". Reconnecting")
  store.dispatch(setStatus(ConnectionMode.Reconnecting))
});

hubConnection.onreconnected(error => {
  console.log("Reconnected! " + error)
  store.dispatch(setStatus(ConnectionMode.Connected))
});

export async function stopRoomConnection(): Promise<void> {
  hubConnection.stop()
  store.dispatch(setStatus(ConnectionMode.Disconnected))
}

/**
 *   MIDDLEWARE - add singnalR 'invoke' here
 */
export const homeMadeMiddleware: Middleware = store => next => async action => {

  console.log("...Middleware...")

  if (action.type === toServer.CreateRoom) {
    hubConnection.invoke(toServer.CreateRoom, action.payload)
  }

  if (action.type === toServer.StartGame) {
    hubConnection.invoke(toServer.StartGame, action.payload)
  }

  console.log(store.getState);

  return next(action);
};

/**
 *   STORE
 */
const store = configureStore({
  reducer: {
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeMadeMiddleware).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>;

export default store;