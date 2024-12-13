import React, { FunctionComponent } from 'react'
import { Player, WordInfoDict } from '../../constants'
import {
  Board,
  InfoSquare,
  InputCategory,
  InputLetter,
  Row,
  Square,
  SquareInput,
} from '.'
import { flagColor } from '../../utilities'

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

  return (
    <Board className="text-[60%]" backgroundColor="white">
      <Row>
        <Square firstInRow>
          {/* <InfoSquare>
            <span>{'Categories '}&rarr;</span>
            <span>{'Letters '}&darr;</span>
          </InfoSquare> */}
        </Square>
        {categories.map((x, i) => {
          return (
            <Square empty key={i}>
              <InputCategory value={x} noStyle disabled />
            </Square>
          )
        })}
      </Row>
      {player.board.map((row, rowNr) => {
        return (
          <Row key={rowNr}>
            <Square empty firstInRow>
              <InputLetter value={letters[rowNr].toLocaleUpperCase()} noStyle disabled />
            </Square>
            {row.map((item, colNr) => {
              const word = player.board[rowNr][colNr].toLowerCase()
              const card = boardDictionary[rowNr][colNr][word]
              return (
                <Square empty key={colNr}>
                  <SquareInput color={flagColor(card.flag)} defaultValue={word}>
                    {word === '' ? '-' : word}
                  </SquareInput>
                </Square>
              )
            })}
          </Row>
        )
      })}
    </Board>
  )
}
