import React, { FunctionComponent } from 'react'
import { RoomState } from './roomStore'
import {
  ConnectionStatus,
  MessageBox,
  PlayerList,
  PlayerMessageBox,
} from '../../common/components/'
import {
  RoomName,
  TimeLimit,
  CreateRoom,
  StartGame,
  HandleAnswers,
  ShowResults,
} from './pages'
import { useAppSelector } from './roomHooks'

export const RoomLayout: FunctionComponent = () => {
  const { commonStates, messages, currentPage, playerMessages, playerList } =
    useAppSelector((state: RoomState) => state.room)

  const showComponent = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <RoomName />
      case 2:
        return <TimeLimit />
      case 3:
        return <CreateRoom />
      case 4:
        return <StartGame />
      case 5:
        return <HandleAnswers />
      case 6:
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
