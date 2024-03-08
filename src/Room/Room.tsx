import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { RoomPages } from './pages/RoomPages'
import { startRoomConnection } from './hubConnection'

export const Room: FunctionComponent = () => {
  const shouldConnect = useRef(true)

  useEffect(() => {
    if (shouldConnect.current) {
      startRoomConnection()
      shouldConnect.current = false
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
