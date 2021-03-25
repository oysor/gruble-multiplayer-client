import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RoomState } from './roomStore'
import {
  ConnectionStatus,
  MessageBox,
  PlayerMessageBox,
  Timer,
} from '../../common/components/'
import {
  RoomName,
  TimeLimit,
  CreateRoom,
  StartGame,
  HandleAnswers,
  ShowResults,
} from './pages'

export const RoomLayout: FunctionComponent = () => {
  const { commonStates, messages, currentPage, playerMessages } = useSelector(
    (state: RoomState) => state.room
  )

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
      <h1>GameRoom</h1>
      <ConnectionStatus status={commonStates.status} />
      {showComponent(currentPage)}
      <MessageBox messages={messages} />
      <PlayerMessageBox playerMessages={playerMessages} />
      <Timer elapsedTime={commonStates.elapsedTime}></Timer>
    </div>
  )
}
