import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { Flag, Player, PlayerResults } from '../../../../common/constants'
import { RoomState } from '../../roomStore'

export const ShowResults: FunctionComponent = () => {
  const { playerList, boardSettings } = useSelector((state: RoomState) => state.room)
  const { letters, categories } = boardSettings

  const getPlayerScore = (player: Player) => {
    const playerResult: PlayerResults = {
      score: 0,
      correct: 0,
      unique: 0,
      common: 0,
      wrong: 0,
      missing: 0,
      unknown: 0,
    }

    const addScore = (flag: Flag) => {
      switch (flag) {
        case Flag.Missing:
          playerResult.missing += 1
          return
        case Flag.Wrong:
          playerResult.wrong += 1
          return
        case Flag.Common:
          playerResult.common += 1
          return
        case Flag.Unique:
          playerResult.unique += 1
          return
        default:
          playerResult.unknown += 1
          return
      }
    }

    for (let l = 0; l < letters.length; l++) {
      for (let c = 0; c < categories.length; c++) {
        addScore(player.scoreBoard[l][c].flag)
      }
    }

    playerResult.correct = playerResult.common + playerResult.unique
    // Each unique answer is worth 2 points
    playerResult.score = playerResult.common + playerResult.unique * 2

    return (
      <div className="score-row" key={player.name}>
        <div className="score-square">{player.name}</div>
        <div className="score-square">{playerResult.score}</div>
        <div className="score-square">{playerResult.correct}</div>
        <div className="score-square"> {playerResult.common}</div>
        <div className="score-square">{playerResult.unique}</div>
        <div className="score-square">{playerResult.wrong}</div>
        <div className="score-square">{playerResult.missing}</div>
      </div>
    )
  }

  const playerResults = () => {
    return (
      <div className={'score-board'}>
        <div className="score-row">
          <div className="score-square">Player </div>
          <div className="score-square">Score </div>
          <div className="score-square">Correct </div>
          <div className="score-square">Common </div>
          <div className="score-square">Unique </div>
          <div className="score-square">Wrong </div>
          <div className="score-square">Missing </div>
        </div>
        {playerList.map((player) => {
          return getPlayerScore(player)
        })}
      </div>
    )
  }

  return <div className="show-results">{playerResults()}</div>
}
