import React, { FunctionComponent } from 'react'
import { ResultTable } from '../../../common/components'
import { RoomState } from '../../store'
import { useAppSelector } from '../../hooks'
import { Stack_l } from '../../../common/everyLayout'
import { ResultBoard } from '../../../common/components/boards/ResultBoard'

export const ShowResults: FunctionComponent = () => {
  const { playerList, boardDictionary, boardSettings } = useAppSelector(
    (state: RoomState) => state.room
  )

  return (
    <div className="show-results">
      <ResultTable playerList={playerList} />
      {playerList.map((player, i) => {
        return (
          <Stack_l key={i}>
            <h2>{player.name}</h2>
            <ResultBoard
              player={player}
              boardDictionary={boardDictionary}
              boardSettings={boardSettings}
            />
          </Stack_l>
        )
      })}
    </div>
  )
}
