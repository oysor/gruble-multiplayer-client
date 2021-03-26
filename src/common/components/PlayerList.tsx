import React, { FunctionComponent } from 'react'
import { Player } from '../constants'

type PlayerListProps = {
  playerList: Player[]
}

export const PlayerList: FunctionComponent<PlayerListProps> = ({ playerList }) => {
  return playerList.length > 0 ? (
    <div className="room-player-list">
      {playerList.map(function (player, idx) {
        return (
          <div key={idx}>
            Player {idx + 1}: <span style={{ color: player.color }}>{player.name}</span>{' '}
          </div>
        )
      })}
    </div>
  ) : null
}
