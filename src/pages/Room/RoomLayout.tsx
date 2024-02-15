import React, { FunctionComponent } from 'react'
import { RoomState } from './roomStore'
import {
  ConnectionStatus,
  MessageBox,
  PlayerList,
  PlayerMessageBox,
} from '../../common/components/'
import { PrepareBoard, StartGame, HandleAnswers, ShowResults } from './pages'
import { useAppSelector } from './roomHooks'
import { PrepareRoom } from './pages/1.PrepareRoom'

export const RoomLayout: FunctionComponent = () => {
  const { commonStates, messages, currentPage, playerMessages, playerList } =
    useAppSelector((state: RoomState) => state.room)

  const showComponent = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <PrepareRoom />
      case 2:
        return <PrepareBoard />
      case 3:
        return <StartGame />
      case 4:
        return <HandleAnswers />
      case 5:
        return <ShowResults />
    }
  }

  return (
    <div className="room-layout">
      <div className="layout-header">
        <div className="header-logo">
          <h1>GameRoom</h1>
          <ConnectionStatus status={commonStates.status} />
        </div>
      </div>
      <div className="layout-main">{showComponent(currentPage)}</div>
      <div className="layout-bottom">
        <PlayerList playerList={playerList} />
        <div className="message-boxes">
          <MessageBox messages={messages} />
          <PlayerMessageBox playerMessages={playerMessages} />
        </div>
      </div>
    </div>
  )
}
