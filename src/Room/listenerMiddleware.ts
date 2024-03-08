// listenerMiddleware.ts
import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { RoomState, AppDispatch } from './store'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RoomState,
  AppDispatch
>()

export const addAppListener = addListener.withTypes<RoomState, AppDispatch>()
