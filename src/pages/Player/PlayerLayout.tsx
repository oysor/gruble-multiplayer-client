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
import { Cover_l } from '../../common/styledComponents/everyLayout'

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
    <Cover_l centered="div">
      <div className="layout-header">
        {/* <div className="header-logo"> */}
        {/* <div>Name yourself and input the roomId</div> */}
        {/* </div> */}
        <ConnectionStatus status={commonStates.status} />
      </div>
      <div className="layout-main">{showComponent(currentPage)}</div>
      <div className="layout-bottom">
        {/* <ShowPlayerInput /> */}
        {/* <SendMessage roomId={roomId} /> */}
        <PlayerList playerList={playerList} />
        <div className="message-boxes">
          <MessageBox messages={messages} />
          {/* <PlayerMessageBox playerMessages={playerMessages} /> */}
        </div>
      </div>
    </Cover_l>
  )
}
