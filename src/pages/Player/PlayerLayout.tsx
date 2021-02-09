import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { PlayerState } from './playerStore'
import { ConnectionStatus, MessageBox, Timer } from '../../common/components/'
import { JoinGame } from './pages/1.JoinGame'
import { ShowPlayerInput } from './components'

export const PlayerLayout: FunctionComponent = () => {
  const { commonStates, messages } = useSelector((state: PlayerState) => state.player)

  return (
    <div className="player-layout">
      <h1>PlayerRoom</h1>
      <JoinGame />
      <ShowPlayerInput />
      <MessageBox messages={messages} />
      <ConnectionStatus status={commonStates.status} />
      <Timer elapsedTime={commonStates.elapsedTime}></Timer>
    </div>
  )
}
