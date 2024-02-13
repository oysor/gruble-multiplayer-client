import React, { FunctionComponent } from 'react'
import { PlayerState } from './playerStore'
import {
  ConnectionStatus,
  MessageBox,
  PlayerList,
  PlayerMessageBox,
} from '../../common/components/'
// import { ShowPlayerInput } from './components'
import { JoinGame, Play, Results } from './pages'
import { SendMessage } from './components/SendMessage'
import { useAppSelector } from './playerHooks'

export const PlayerLayout: FunctionComponent = () => {
  const { commonStates, messages, currentPage, roomId, playerMessages, playerList } =
    useAppSelector((state: PlayerState) => state.player)

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
      <div className="layout-header">
        <div className="header-logo">
          <h1>PlayerRoom</h1>
          <ConnectionStatus status={commonStates.status} />
        </div>
      </div>
      <div className="layout-main">{showComponent(currentPage)}</div>
      <div className="layout-bottom">
        {/* <ShowPlayerInput /> */}
        <SendMessage roomId={roomId} />
        <PlayerList playerList={playerList} />
        <div className="message-boxes">
          <MessageBox messages={messages} />
          <PlayerMessageBox playerMessages={playerMessages} />
        </div>
      </div>
    </div>
  )
}
