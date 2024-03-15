import React, { FunctionComponent } from 'react'
import { PlayerState } from '../../store'
import { useAppSelector } from '../../hooks'
import { Box_l, Stack_l } from '../../../common/everyLayout'
import { Table } from '../../../common/components/tables'
import { PlayerResultBoards } from '../../../common/components/boards'

export const Results: FunctionComponent = () => {
  const { playerName, receivedResult, playerList, boardDictionary, boardSettings } =
    useAppSelector((state: PlayerState) => state.player)

  const playerStats = playerList.map((p) => {
    return { player: p.name, ...p.playerResult }
  })

  const winner = playerStats.reduce(function (prev, current) {
    return prev && prev.score > current.score ? prev : current
  })

  const nameOfWinner = playerName === winner.player ? 'You' : winner.player
  return (
    <div className="show-results">
      {receivedResult ? (
        <Box_l>
          <Stack_l space="2.5rem">
            <Table playerStats={playerStats} />
            <Stack_l space="0.3rem">
              <div>
                The winner is {nameOfWinner} with {winner.score} points
              </div>
              <PlayerResultBoards
                players={playerList}
                boardDictionary={boardDictionary}
                boardSettings={boardSettings}
              />
            </Stack_l>
          </Stack_l>
        </Box_l>
      ) : (
        <h2>Waiting for results...</h2>
      )}
    </div>
  )
}
