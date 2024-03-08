import React from 'react'
import { FunctionComponent } from 'react'
import { Player, Board } from '../../common/constants'

interface PlayerAnswerBoardProps {
  player: Player
  square: { letter: number; category: number }
}

export const PlayerAnswerBoard: FunctionComponent<PlayerAnswerBoardProps> = ({
  player,
  square,
}) => {
  const { letter, category } = square

  const boardRow = (row: string[], rowNr: number) => {
    return row.map((sq, i) => {
      const bcolor = i === category && rowNr === letter ? '#bfbbbb' : ''
      return (
        <div className="board-square" key={i} style={{ backgroundColor: bcolor }}>
          {/* <span style={{ color: flagColor(sq.flag) }}>{sq}</span> */}
        </div>
      )
    })
  }

  const boardColumns = (board: Board) => {
    return board.map((row, i) => {
      return (
        <div className="board-row" key={i}>
          {boardRow(row, i)}
        </div>
      )
    })
  }

  return (
    <div className="board">
      {player.board != undefined ? boardColumns(player.board) : null}
    </div>
  )
}
