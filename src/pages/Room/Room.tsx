import React, { FunctionComponent, useEffect } from 'react'
import { Provider } from 'react-redux'
import store, { startRoomConnection, stopRoomConnection } from './roomStore'
import { resetState } from './roomReducer'
import { NavigationType } from 'react-router-dom'
import { RoomLayout } from './RoomLayout'
import { router } from '../../App'

export const Room: FunctionComponent = () => {
  useEffect(() => {
    startRoomConnection()
    return router.subscribe((state) => {
      if (state.historyAction === NavigationType.Pop) {
        resetState()
        stopRoomConnection()
      }
    })
  }, [])

  return (
    <Provider store={store}>
      <div className="room-page">
        <RoomLayout />
      </div>
    </Provider>
  )
}
