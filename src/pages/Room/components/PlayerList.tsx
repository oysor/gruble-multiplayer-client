import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RoomState } from '../roomStore'

export const PlayerList: FunctionComponent = () => {
  const { playerList } = useSelector((state: RoomState) => state.room)

  return (
    <div>
      {playerList.map(function (player, idx) {
        return (
          <div key={idx}>
            {idx}: <span style={{ color: player.color }}>{player.name}</span>{' '}
          </div>
        )
      })}
    </div>
  )
}
