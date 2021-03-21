import React, { FunctionComponent, useEffect } from 'react'
import { Provider } from 'react-redux'
import { useHistory } from 'react-router-dom'
import store, { startPlayerConnection, stopPlayerConnection } from './playerStore'
import { PlayerLayout } from './PlayerLayout'
import { resetState } from './playerReducer'

export const Player: FunctionComponent = () => {
  // Start connection
  useEffect(() => {
    startPlayerConnection()
  })

  const history = useHistory()
  // End connection when going back (browser back button)
  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'POP' && location.pathname === '/') {
        // reset store
        store.dispatch(resetState)
        // stop singnalR
        stopPlayerConnection()
      }
    })
  })

  return (
    <Provider store={store}>
      <div className="player-page">
        <PlayerLayout />
      </div>
    </Provider>
  )
}

export default Player
