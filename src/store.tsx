import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import playerReducer from './pages/Player/playerSlice'
import roomReducer, {setStatus} from './pages/Room/roomSlice'
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
    // Receive stuff
    // hubConnection.on('setClientMessage', (msg) => {
    //     store.dispatch(newMessage(msg));
    //     if(store.getState().player.status === LoadingMode.Loading ){
    //         store.dispatch(setConnectionID(hubConnection.connectionId))
    //     }
    // })

    /*

            Lobbyroom
    */
    console.log(store.getState())

    // hubConnection.on('onPlayerStats', (msg) => {
    //     // store.dispatch(newMessage(msg));
    // })

    // hubConnection.on('onCreateGame', (msg) => {
    //     // store.dispatch(newMessage(msg));
    // })


    /* 
    
            Lobbyrom and Player

    */

    // hubConnection.on('onStartGame', (msg) => {
    // // store.dispatch(newMessage(msg));
    // })

    // hubConnection.on('onPLayerJoined', (msg) => {
    //     // store.dispatch(newMessage(msg));
    // })

    // hubConnection.on('onPlayerLeft', (msg) => {
    //     // store.dispatch(newMessage(msg));
    // })

    // hubConnection.on('onTimerCount', (msg) => {
    //     // store.dispatch(newMessage(msg));
    // })

    // hubConnection.on('onTimeEnd', (msg) => {
    //     // store.dispatch(newMessage(msg));
    // })


    // Send stuff
    if (action.type === 'CREATE_GAME') {
        hubConnection.invoke('CreateGame', hubConnection.connectionId)
    
    }
    // if (action.type === 'SEND_CONNECTION_ID') {
    //     hubConnection.invoke('SendConnectionId', hubConnection.connectionId)
    // }



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

