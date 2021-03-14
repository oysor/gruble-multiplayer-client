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
      <div className="score-row" key={player.name}>
        <div className="score-square">{player.name}</div>
        <div className="score-square">{score}</div>
        <div className="score-square">{correct}</div>
        <div className="score-square"> {common}</div>
        <div className="score-square">{unique}</div>
        <div className="score-square">{wrong}</div>
        <div className="score-square">{missing}</div>
      </div>
    )
  }

  const Results = () => {
    return (
      <div className="score-board">
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
          return getPlayerResult(player)
        })}
      </div>
    )
  }

  return <div className="result-table">{Results()}</div>
}
