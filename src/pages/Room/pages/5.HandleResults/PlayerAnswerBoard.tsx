import React from 'react'
import { FunctionComponent } from 'react'
import { Player, ScoreBoard, ScoreCard } from '../../../../common/constants'
import { flagColor } from '../../computation/calculation'

interface PlayerAnswerBoardProps {
  player: Player
  square?: { letter: number; category: number }
}

export const PlayerAnswerBoard: FunctionComponent<PlayerAnswerBoardProps> = ({
  player,
  square = {},
}) => {
  const { letter, category } = square

  const boardRow = (row: ScoreCard[], rowNr: number) => {
    return row.map((sq, i) => {
      const bcolor = i === category && rowNr === letter ? '#bfbbbb' : ''
      return (
        <div className="board-square" key={i} style={{ backgroundColor: bcolor }}>
          <span style={{ color: flagColor(sq.flag) }}>{sq.word}</span>
        </div>
      )
    })
  }

  const boardColumns = (scoreBoard: ScoreBoard) => {
    return scoreBoard.map((row, i) => {
      return (
        <div className="board-row" key={i}>
          {boardRow(row, i)}
        </div>
      )
    })
  }

  return (
    <div className="board">
      {player.scoreBoard != undefined ? boardColumns(player.scoreBoard) : null}
    </div>
  )
}
