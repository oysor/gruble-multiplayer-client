import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { PlayerState } from './playerStore'
import { ConnectionStatus, MessageBox, Timer } from '../../common/components/'
import { ShowPlayerInput } from './components'
import { JoinGame, Play, Results } from './pages'
import { SendMessage } from './components/SendMessage'

export const PlayerLayout: FunctionComponent = () => {
  const { commonStates, messages, currentPage, roomId } = useSelector(
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
      <SendMessage roomId={roomId} />
      <Timer elapsedTime={commonStates.elapsedTime}></Timer>
    </div>
  )
}
