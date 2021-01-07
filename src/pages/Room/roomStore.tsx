import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import roomReducer, {roomToServer, fromServer, setStatus, roomCreated, newMessage} from './roomSlice'
import { ConnectionMode } from '../../common/constants/status'
import * as signalR from "@microsoft/signalr";

// Builds the SignalR connection, mapping it to /chathub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/chathub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

type User = {
    name:string,
    connectionId: string,
    role: number
}

type CreateGameProps = {
  roomId: string,
  lobbyName: string,
  timeLimit: number,
  maxUsers: number,
  users: [ User ] 
} 

/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function startRoomConnection(): Promise<void> {
  try {
    await hubConnection.start();
    console.log("***** ROOM connected *****");
    store.dispatch(setStatus(ConnectionMode.Connected))

    hubConnection.on("onTimerCount", (msg) => {
      console.log(msg)
    })

    hubConnection.on(fromServer.onCreateRoom, (msg: CreateGameProps) => {
      console.log("onCreateGame", msg)
      store.dispatch(roomCreated(msg))
    })

    hubConnection.on(fromServer.onPlayerJoined, (msg) => {
      console.log("PLAYER JOINED ROOM")
      store.dispatch(newMessage(msg))
    })

    hubConnection.on(fromServer.ReceiveMessage, (msg, msg2) => {
      console.log("RECEIVE MESSAGE")
      console.log(msg, msg2)
      const combinedMessage = (msg + " says " + msg2) 
      store.dispatch(newMessage(combinedMessage))
    })

  } catch (err) {
    console.log(err);
    console.log("***** Connection FAILED ******");
    store.dispatch(setStatus(ConnectionMode.Failed))
    setTimeout(startRoomConnection, 5000);
  }
}

hubConnection.onclose(startRoomConnection);

// Starts the signalR connection
// start();

/**
 *   MIDDLEWARE - add singnalR 'invoke' here
 */
export const homeMadeMiddleware: Middleware = store => next => async action => {

    console.log("...Middleware...")

    if (action.type === roomToServer.CreateRoom) {
      hubConnection.invoke(roomToServer.CreateRoom, action.payload)
      console.log("CREATE NEW ROOM")
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