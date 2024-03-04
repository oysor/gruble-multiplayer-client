import React, { FunctionComponent } from 'react'
import { Player, WordInfoDict } from '../constants'
import { Board, InfoSquare, Row, Square, SquareInput } from '../styledComponents/board'
import { flagColor } from '../utilities'

interface ResultBoardProps {
  player: Player
  boardSettings: { categories: string[]; letters: string[] }
  boardDictionary: WordInfoDict[][]
}

export const ResultBoard: FunctionComponent<ResultBoardProps> = ({
  player,
  boardSettings,
  boardDictionary,
}) => {
  const { categories, letters } = boardSettings

  const boardRow = (row: string[], rowNr: number) => {
    return (
      <Row key={rowNr}>
        <Square empty firstInRow>
          {letters[rowNr].toLocaleUpperCase()}
        </Square>
        {row.map((item, colNr) => {
          const word = player.board[rowNr][colNr].toLowerCase()
          const card = boardDictionary[rowNr][colNr][word]
          return (
            <Square empty key={colNr}>
              <SquareInput color={flagColor(card.flag)} defaultValue={word}>
                {word}
              </SquareInput>
            </Square>
          )
        })}
      </Row>
    )
  }

  return (
    <Board>
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
      {player.board.map((row, rowNr) => {
        return boardRow(row, rowNr)
      })}
    </Board>
  )
}
