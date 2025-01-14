import React, { FunctionComponent } from 'react'
import { Box_l, Stack_l } from '../../../common/everyLayout'
import { Table } from '../../../common/components/tables'
import { PlayerResultBoards } from '../../../common/components/boards'
import { useAppSelector } from '../../hooks'
import { PlayerState } from '../../store'
import { calculatePlayerStats } from '../../../common/utilities'

interface PlayerResults {
  //   setName: (code: string) => void
  //   username: string
}

export const PlayerResults: FunctionComponent<PlayerResults> = () => {
  const { playerName, playerList, boardDictionary, boardSettings } = useAppSelector(
    (state: PlayerState) => state.player
  )

  const playerStats = playerList.map((p) => {
    const playerResult = calculatePlayerStats(p, boardSettings, boardDictionary)
    return { player: p.name, ...playerResult }
  })

  const winner = playerStats.reduce(function (prev, current) {
    return prev && prev.score > current.score ? prev : current
  })

  const nameOfWinner = playerName === winner.player ? 'You' : winner.player

  return (
    <div className="flex flex-col h-[100%]">
      <Box_l>
        <Stack_l space="2.5rem">
          <Table playerStats={playerStats} />
          <div>
            {nameOfWinner} won with {winner.score} points
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
