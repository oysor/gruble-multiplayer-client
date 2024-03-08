import { addListener, createListenerMiddleware } from '@reduxjs/toolkit'
import { AppDispatch, PlayerState } from './store'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
  PlayerState,
  AppDispatch
>()

export const addAppListener = addListener.withTypes<PlayerState, AppDispatch>()
