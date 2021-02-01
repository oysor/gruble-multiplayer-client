import React, { FunctionComponent } from 'react'
import { Square } from './Square'

interface InputBoardProps {
  board: string[][]
  boardSettings: { categories: string[]; letters: string[] }
}

export const InputBoard: FunctionComponent<InputBoardProps> = ({
  board,
  boardSettings,
}) => {
  const { categories, letters } = boardSettings

  const headerRow = (
    <div className="board-row">
      <div className="board-square"></div>
      {categories.map((category, i) => {
        return (
          <div className="board-square" key={i}>
            {category}
          </div>
        )
      })}
    </div>
  )

  const boardRow = (row: string[], x: number) => {
    return (
      <div className="board-row" key={x}>
        <div className="board-square"> {letters[x]}</div>
        {row.map((item, y) => {
          return <Square key={y} coords={{ x: x, y: y }} board={board} />
        })}
      </div>
    )
  }

  return (
    <div className="board">
      {headerRow}
      {board.map((row, x) => {
        return boardRow(row, x)
      })}
    </div>
  )
}
