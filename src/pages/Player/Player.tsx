import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store, { startPlayerConnection, stopPlayerConnection } from './playerStore'
import { PlayerLayout } from './PlayerLayout'
import { router } from '../../App'
import { NavigationType } from 'react-router-dom'
import { resetState } from './playerReducer'

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
      <div className="player-page">
        <PlayerLayout />
      </div>
    </Provider>
  )
}
