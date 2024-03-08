import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import playerReducer from './reducer'
import { listenerMiddleware } from './listenerMiddleware'

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
