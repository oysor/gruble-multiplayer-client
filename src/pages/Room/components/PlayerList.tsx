import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../roomStore'

export const PlayerList: FunctionComponent = () => {
  const { playerList } = useSelector((state: RootState) => state.room)

  return (
    <div>
      {playerList.map(function (d, idx) {
        return (
          <div key={idx}>
            {idx}: <span style={{ color: d.color }}>{d.playerName}</span>{' '}
          </div>
        )
      })}
    </div>
  )
}
