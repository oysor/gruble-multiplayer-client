import React, { FunctionComponent } from 'react'
import * as S from '../../../common/components/boards'
import { InputSquare } from './InputSquare'

interface InputBoardProps {
  board: string[][]
  boardSettings: { categories: string[]; letters: string[] }
}

export const InputBoard: FunctionComponent<InputBoardProps> = ({
  board,
  boardSettings,
}) => {
  const { categories, letters } = boardSettings

  // Displays the first row with categories
  const headerRow = (
    <S.Row>
      <S.Square firstInRow>
        <S.InfoSquare>
          <span>{'Categories '}&rarr;</span>
          <span>{'Letters '}&darr;</span>
        </S.InfoSquare>
      </S.Square>
      {categories.map((x, i) => {
        return (
          <S.Square empty key={i}>
            {x}
          </S.Square>
        )
      })}
    </S.Row>
  )

  const boardRow = (row: string[], x: number) => {
    return (
      <S.Row key={x}>
        <S.Square empty firstInRow>
          {letters[x].toLocaleUpperCase()}
        </S.Square>
        {row.map((item, y) => {
          return (
            <S.Square empty key={y}>
              <InputSquare key={y} coords={{ x: x, y: y }} board={board} />
            </S.Square>
          )
        })}
      </S.Row>
    )
  }

  return (
    <S.Board>
      {headerRow}
      {board.map((row, x) => {
        return boardRow(row, x)
      })}
    </S.Board>
  )
}
