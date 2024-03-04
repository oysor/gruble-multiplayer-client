import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store, { startRoomConnection } from './roomStore'
import { NavigationType } from 'react-router-dom'
import { RoomLayout } from './RoomLayout'
import { router } from '../../App'

export const Room: FunctionComponent = () => {
  const shouldConnect = useRef(true)

  useEffect(() => {
    if (shouldConnect.current) {
      startRoomConnection()
      shouldConnect.current = false
    }

    return router.subscribe((state) => {
      if (state.historyAction === NavigationType.Pop) {
        // resetState()
        // stopRoomConnection()
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
