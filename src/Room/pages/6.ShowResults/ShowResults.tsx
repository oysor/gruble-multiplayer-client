import React, { FunctionComponent } from 'react'
import { RoomState } from '../../store'
import { useAppSelector } from '../../hooks'
import { Box_l, Stack_l } from '../../../common/everyLayout'
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
    <div id="show-results">
      <Box_l>
        <Stack_l space="2.5rem">
          <Table playerStats={playerStats} />
          <div>
            {winner.player} won {winner.score} points
          </div>
          <PlayerResultBoards
            playerList={playerList}
            boardDictionary={boardDictionary}
            boardSettings={boardSettings}
          />
        </Stack_l>
      </Box_l>
    </div>
  )
}
