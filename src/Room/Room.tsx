import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { NavigationType } from 'react-router-dom'
import { RoomPages } from './pages/RoomPages'
import { router } from '../App'
import { startRoomConnection } from './hubConnection'

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
        <RoomPages />
      </div>
    </Provider>
  )
}
