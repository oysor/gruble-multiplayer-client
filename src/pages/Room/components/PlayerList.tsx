import React, { FunctionComponent } from 'react'
import { Player } from '../../../common/constants'

type PlayerListProps = {
  playerList: Player[]
}

export const PlayerList: FunctionComponent<PlayerListProps> = ({ playerList }) => {
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
