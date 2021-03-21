import React, { FunctionComponent } from 'react'
import { Player } from '../constants'

interface ResultTableProps {
  playerList: Player[]
}
/*
 * Displays a table listing all players and their scores
 */
export const ResultTable: FunctionComponent<ResultTableProps> = ({ playerList }) => {
  const getPlayerResult = (player: Player) => {
    const { score, correct, common, unique, wrong, missing } = player.playerResult
    return (
      <div className="result-row" key={player.name}>
        <div className="result-square">{player.name}</div>
        <div className="result-square">{score}</div>
        <div className="result-square">{correct}</div>
        <div className="result-square"> {common}</div>
        <div className="result-square">{unique}</div>
        <div className="result-square">{wrong}</div>
        <div className="result-square">{missing}</div>
      </div>
    )
  }

  return (
    <div className="result-board">
      <div className="result-row">
        <div className="result-square">Player </div>
        <div className="result-square">Score </div>
        <div className="result-square">Correct </div>
        <div className="result-square">Common </div>
        <div className="result-square">Unique </div>
        <div className="result-square">Wrong </div>
        <div className="result-square">Missing </div>
      </div>
      {playerList.map((player) => {
        return getPlayerResult(player)
      })}
    </div>
  )
}
