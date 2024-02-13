import React, { FunctionComponent, useEffect } from 'react'
import { Provider } from 'react-redux'
import store, { startPlayerConnection, stopPlayerConnection } from './playerStore'
import { PlayerLayout } from './PlayerLayout'
import { router } from '../../App'
import { NavigationType } from 'react-router-dom'
import { resetState } from './playerReducer'

export const Player: FunctionComponent = () => {
  // Start connection
  useEffect(() => {
    startPlayerConnection()
    return router.subscribe((state) => {
      if (state.historyAction === NavigationType.Pop) {
        resetState()
        stopPlayerConnection()
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

export default Player
