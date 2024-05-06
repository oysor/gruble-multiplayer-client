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

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Custom logic to handle the refresh
      // preventDefault() gives the user option to refresh or not.
      event.preventDefault()
      return (event.returnValue = '')
    }
    const handleBackButton = (event: PopStateEvent) => {
      // Custom logic to handle the back button
      alert('Room closed.')
      event.preventDefault()
    }

    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true })
    window.addEventListener('popstate', handleBackButton, { capture: true })

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true })
      window.removeEventListener('popstate', handleBackButton, { capture: true })
      stopRoomConnection()
    }
  }, [])

  return (
    <Provider store={store}>
      <RoomPages />
    </Provider>
  )
}
