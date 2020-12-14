import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import playerReducer from './features/player/playerSlice'
import roomReducer, { setStatus, newMessage } from './features/room/roomSlice'
import hubConnection, { start } from './hub/hubConnection'

start().then(() => {
    // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
    if (hubConnection.connectionId) {
        hubConnection.invoke("sendConnectionId", hubConnection.connectionId);
    }
    hubConnection.on('setClientMessage', (msg) => {
        store.dispatch(newMessage(msg));
        store.dispatch(setStatus('LOADED'))
    })
});

export const homeMadeMiddleware: Middleware = store => next => async action => {

    // Send stuff
    if (action.type === 'SEND_CONNECTION_ID') {
        hubConnection.invoke('SendConnectionId', hubConnection.connectionId)
    }
    // Receive stuff
    hubConnection.on('setClientMessage', (msg) => {
        store.dispatch(newMessage(msg));
    })
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

