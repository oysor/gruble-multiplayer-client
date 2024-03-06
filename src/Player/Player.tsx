import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { router } from '../App'
import { NavigationType } from 'react-router-dom'
import { resetState } from './reducer'
import { startPlayerConnection } from './hubConnection'
import { PlayerPages } from './pages'

export const Player: FunctionComponent = () => {
  const shouldConnect = useRef(true)

  useEffect(() => {
    if (shouldConnect.current) {
      startPlayerConnection()
      shouldConnect.current = false
    }

    return router.subscribe((state) => {
      console.log('useffect dismount')
      if (state.historyAction === NavigationType.Pop) {
        console.log('useffect back button')
        // stopPlayerConnection()
        // resetState()
      }
    })
  }, [])

  return (
    <Provider store={store}>
      <div id="player">
        <PlayerPages />
      </div>
    </Provider>
  )
}
