import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RoomState } from './roomStore'
import { ConnectionStatus, MessageBox, Timer } from '../../common/components/'
import { PlayerList } from './components/PlayerList'
import {
  RoomName,
  TimeLimit,
  CreateRoom,
  StartGame,
  HandleAnswers,
  ShowResults,
} from './pages'

export const RoomLayout: FunctionComponent = () => {
  const { commonStates, messages, currentPage, playerList } = useSelector(
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
      {showComponent(currentPage)}
      <ConnectionStatus status={commonStates.status} />
      <MessageBox messages={messages} />
      <Timer elapsedTime={commonStates.elapsedTime}></Timer>
      <PlayerList playerList={playerList} />
    </div>
  )
}
