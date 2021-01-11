import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import playerReducer, { toServer, fromServer, setStatus, newMessage } from './playerReducer'
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
export async function startPlayerConnection(): Promise<void> {
  try {
    await hubConnection.start();
    console.log("***** PLAYER connected *****");
    store.dispatch(setStatus(ConnectionMode.Connected))

    hubConnection.on("onTimerCount", (msg) => {
        console.log(msg)
      })

      hubConnection.on(fromServer.onPlayerJoined, (msg) => {
        console.log("PLAYER JOINED ROOM")
        store.dispatch(newMessage(msg))
      })
      
    hubConnection.on(fromServer.receiveMessage, (msg) => {
      console.log("RECEIVE MESSAGE")
      store.dispatch(newMessage(msg))
    })

  } catch (err) {
    console.log(err);
    console.log("***** Connection FAILED ******");
    store.dispatch(setStatus(ConnectionMode.Failed))
    setTimeout(startPlayerConnection, 5000);
  }
}

// hubConnection.onclose(startPlayerConnection);

export async function stopPlayerConnection(): Promise<void> {
    hubConnection.stop()
}  
// Starts the signalR connection
// start();

/**
 *   MIDDLEWARE - add singnalR 'invoke' here
 */
export const homeMadeMiddleware: Middleware = store => next => async action => {

    console.log("...Middleware...")

    if (action.type === toServer.JoinRoom) {
      hubConnection.invoke(toServer.JoinRoom, action.payload.roomName, action.payload.playerName)
      console.log("JOIN ROOM")
    }

    if (action.type === toServer.SendMessage) {
      console.log(action.payload.user, action.payload.msg, action.payload.roomId)
      hubConnection.invoke(toServer.SendMessage, action.payload.user, action.payload.msg, action.payload.roomId)
      console.log("SEND MESSAGE")
    }


    console.log(store.getState);

    return next(action);
};

/**
 *   STORE
 */
const store = configureStore({
    reducer: {
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeMadeMiddleware).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>;

export default store;

