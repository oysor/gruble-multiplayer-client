import React, { FunctionComponent } from 'react'
import { PlayerState } from '../../store'
import { useAppSelector } from '../../hooks'
import { Box_l, Stack_l } from '../../../common/everyLayout'
import { Table } from '../../../common/components/tables'
import { PlayerResultBoards } from '../../../common/components/boards'
import { PlayerStatus } from '../../../common/constants'

export const Results: FunctionComponent = () => {
  const { playerName, playerStatus, playerList, boardDictionary, boardSettings } =
    useAppSelector((state: PlayerState) => state.player)

  const playerStats = playerList.map((p) => {
    return { player: p.name, ...p.playerResult }
  })

  const winner = playerStats.reduce(function (prev, current) {
    return prev && prev.score > current.score ? prev : current
  })

  const nameOfWinner = playerName === winner.player ? 'You' : winner.player
  return (
    <div id="show-results">
      {playerStatus === PlayerStatus.receivedResult ? (
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
      ) : (
        <h3>Awaiting board approval...</h3>
      )}
    </div>
  )
}
