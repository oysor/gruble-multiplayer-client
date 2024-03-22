import React, { FunctionComponent } from 'react'
import { InputSquare } from './InputSquare'
import { Board, InfoSquare, Row, Square } from '../../../common/components/boards'

interface InputBoardProps {
  board: string[][]
  boardSettings: { categories: string[]; letters: string[] }
}

export const InputBoard: FunctionComponent<InputBoardProps> = ({
  board,
  boardSettings,
}) => {
  const { categories, letters } = boardSettings

  return (
    <Board className="text-[0.9em]">
      <Row>
        <Square firstInRow>
          <InfoSquare>
            <span>{'Categories '}&rarr;</span>
            <span>{'Letters '}&darr;</span>
          </InfoSquare>
        </Square>
        {categories.map((x, i) => {
          return (
            <Square empty key={i}>
              {x}
            </Square>
          )
        })}
      </Row>
      {board.map((row, x) => {
        return (
          <Row key={x}>
            <Square empty firstInRow>
              {letters[x].toLocaleUpperCase()}
            </Square>
            {row.map((item, y) => {
              return (
                <Square empty key={y}>
                  <InputSquare key={y} coords={{ x: x, y: y }} board={board} />
                </Square>
              )
            })}
          </Row>
        )
      })}
    </Board>
  )
}
