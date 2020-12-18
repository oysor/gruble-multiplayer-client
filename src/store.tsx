import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import playerReducer from './pages/Player/playerSlice'
import roomReducer, {toServer, fromServer,setStatus, roomCreated} from './pages/Room/roomSlice'
import { ConnectionMode } from './common/constants/status'
import * as signalR from "@microsoft/signalr";

// Builds the SignalR connection, mapping it to /chat
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/chathub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export async function start(): Promise<void> {
  try {
    await hubConnection.start();
    console.log("***** SignalR Connected *****");
    store.dispatch(setStatus(ConnectionMode.Connected))


    /**  
     *  ---------- Listeners ---------
    */

    hubConnection.on(fromServer.RoomCreated, (msg) => {
      store.dispatch(roomCreated(msg))
    })


    /**  
     *  -------------------------------
    */

  } catch (err) {
    console.log(err);
    console.log("***** Connection FAILED ******");
    store.dispatch(setStatus(ConnectionMode.Failed))
    setTimeout(start, 5000);
  }
}

hubConnection.onclose(start);

// Starts the signalR connection
start();

export const homeMadeMiddleware: Middleware = store => next => async action => {

    console.log("...Middleware...")

    // Send stuff
    if (action.type === toServer.createNewRoom) {
        hubConnection.invoke('createNewRoom')
        console.log("CREATE NEW ROOM")
    }

    return next(action);
};

const store = configureStore({
    reducer: {
        player: playerReducer,
        room: roomReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeMadeMiddleware).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
})



console.log(store.getState())

export type RootState = ReturnType<typeof store.getState>;

export default store;

