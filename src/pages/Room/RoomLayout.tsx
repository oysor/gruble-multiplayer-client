import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RoomName } from './pages/1.RoomName'
import { RoomState } from './roomStore'
import { ConnectionStatus, MessageBox, Timer } from '../../common/components/'
import { PlayerList } from './components/PlayerList'

export const RoomLayout: FunctionComponent = () => {
  const { commonStates, messages } = useSelector((state: RoomState) => state.room)

  return (
    <div className="room-layout">
      <h1>GameRoom</h1>
      <RoomName />
      <ConnectionStatus status={commonStates.status} />
      <MessageBox messages={messages} />
      <Timer elapsedTime={commonStates.elapsedTime}></Timer>
      <PlayerList />
    </div>
  )
}
