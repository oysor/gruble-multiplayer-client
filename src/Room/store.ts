import { configureStore } from '@reduxjs/toolkit'
import roomReducer from './reducer'
import { listenerMiddleware } from './listenerMiddleware'
import logger from 'redux-logger'

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
