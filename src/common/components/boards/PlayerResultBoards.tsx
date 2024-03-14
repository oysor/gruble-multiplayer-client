import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../everyLayout'
import { ResultBoard } from './ResultBoard'
import { BoardSettings, Player, WordInfoDict } from '../../constants'

interface ResultBoards {
  players: Player[]
  boardSettings: BoardSettings
  boardDictionary: WordInfoDict[][]
}

export const PlayerResultBoards: FunctionComponent<ResultBoards> = ({
  players,
  boardSettings,
  boardDictionary,
}) => {
  return (
    <Stack_l>
      {players.map((player, i) => {
        return (
          <Stack_l key={i}>
            <div className="text-center text-xl">{player.name}</div>
            <ResultBoard
              player={player}
              boardDictionary={boardDictionary}
              boardSettings={boardSettings}
            />
          </Stack_l>
        )
      })}
    </Stack_l>
  )
}
