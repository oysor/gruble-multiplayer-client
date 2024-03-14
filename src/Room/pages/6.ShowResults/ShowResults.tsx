import React, { FunctionComponent } from 'react'
import { RoomState } from '../../store'
import { useAppSelector } from '../../hooks'
import { Stack_l } from '../../../common/everyLayout'
import { Table } from '../../../common/components/tables'
import { PlayerResultBoards } from '../../../common/components/boards'

export const ShowResults: FunctionComponent = () => {
  const { playerList, boardDictionary, boardSettings } = useAppSelector(
    (state: RoomState) => state.room
  )
  const playerStats = playerList.map((p) => {
    return { player: p.name, ...p.playerResult }
  })

  const winner = playerStats.reduce(function (prev, current) {
    return prev && prev.score > current.score ? prev : current
  })

  return (
    <div className="show-results">
      <Stack_l space="1rem">
        <Table playerStats={playerStats} />
        <div>
          The winner is {winner.player} with {winner.score} points
        </div>
        <PlayerResultBoards
          players={playerList}
          boardDictionary={boardDictionary}
          boardSettings={boardSettings}
        />
      </Stack_l>
    </div>
  )
}
