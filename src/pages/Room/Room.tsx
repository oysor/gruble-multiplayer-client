import React, { FunctionComponent, useEffect } from 'react'
import { Provider } from 'react-redux'
import { useHistory } from 'react-router-dom'
import store, { startRoomConnection, stopRoomConnection } from './roomStore'
import { resetState } from './roomReducer'
import { RoomLayout } from './RoomLayout'

export const Room: FunctionComponent = () => {
  // Start connection
  useEffect(() => {
    startRoomConnection()
  })

  // End connection when going back (browser back button)
  const history = useHistory()
  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'POP' && location.pathname === '/') {
        // reset store
        store.dispatch(resetState())
        // stop singnalR
        stopRoomConnection()
      }
    })
  })

  return (
    <Provider store={store}>
      <div className="room-page">
        <RoomLayout />
      </div>
    </Provider>
  )
}
