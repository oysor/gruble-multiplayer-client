import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { RoomPages } from './pages/RoomPages'
import { startRoomConnection, stopRoomConnection } from './hubConnection'

export const Room: FunctionComponent = () => {
  const shouldConnect = useRef(true)

  useEffect(() => {
    if (shouldConnect.current) {
      startRoomConnection()
      shouldConnect.current = false
    }
    return () => {
      window.onpopstate = () => {
        // alert('You are now logged out.')
        stopRoomConnection()
        // window.location.reload()
      }
    }
  }, [])

  return (
    <Provider store={store}>
      <div id="player">
        <RoomPages />
      </div>
    </Provider>
  )
}
