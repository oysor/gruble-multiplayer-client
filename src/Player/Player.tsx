import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { startPlayerConnection } from './hubConnection'
import { PlayerPages } from './pages'

export const Player: FunctionComponent = () => {
  const shouldConnect = useRef(true)

  useEffect(() => {
    if (shouldConnect.current) {
      startPlayerConnection()
      shouldConnect.current = false
    }
  }, [])

  return (
    <Provider store={store}>
      <div id="player">
        <PlayerPages />
      </div>
    </Provider>
  )
}
