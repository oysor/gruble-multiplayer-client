import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { startPlayerConnection, stopPlayerConnection } from './hubConnection'
import { PlayerPages } from './pages'

export const Player: FunctionComponent = () => {
  const shouldConnect = useRef(true)

  useEffect(() => {
    if (shouldConnect.current) {
      startPlayerConnection()
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
      alert('Player logged out.')
      event.preventDefault()
    }

    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true })
    window.addEventListener('popstate', handleBackButton, { capture: true })

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true })
      window.removeEventListener('popstate', handleBackButton, { capture: true })
      stopPlayerConnection()
    }
  }, [])

  return (
    <Provider store={store}>
      <PlayerPages />
    </Provider>
  )
}
