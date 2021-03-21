import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { PlayerState } from './playerStore'
import { ConnectionStatus, MessageBox, Timer } from '../../common/components/'
import { ShowPlayerInput } from './components'
import { JoinGame, Play, Results } from './pages'

export const PlayerLayout: FunctionComponent = () => {
  const { commonStates, messages, currentPage } = useSelector(
    (state: PlayerState) => state.player
  )

  const showComponent = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <JoinGame />
      case 2:
        return <Play />
      case 3:
        return <Results />
    }
  }

  return (
    <div className="player-layout">
      <h1>PlayerRoom</h1>
      {showComponent(currentPage)}
      <ShowPlayerInput />
      <MessageBox messages={messages} />
      <ConnectionStatus status={commonStates.status} />
      <Timer elapsedTime={commonStates.elapsedTime}></Timer>
    </div>
  )
}
