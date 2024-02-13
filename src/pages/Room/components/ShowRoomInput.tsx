import React, { FunctionComponent } from 'react'
import { RoomState } from '../roomStore'
import { useAppSelector } from '../roomHooks'

export const ShowRoomInput: FunctionComponent = () => {
  const { roomId, roomName, timeLimit } = useAppSelector((state: RoomState) => state.room)

  return (
    <div className="show-room-input">
      <div>RoomName: {roomName}</div>
      <div>TimeLimit: {timeLimit}</div>
      <div>
        roomId:<b>{roomId}</b>
      </div>
      {/* <div>GameBoard: {JSON.stringify(boardSettings)}</div> */}
      {/* <div>
        Players:
        {playerList.map((p, k) => {
          return <div key={k}>{JSON.stringify(p)}</div>
        })}
      </div> */}
    </div>
  )
}
