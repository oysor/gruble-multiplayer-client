import React, { FunctionComponent } from 'react'
import { Player } from '../../../common/constants'
import { useAppSelector } from '../../hooks'
import { RoomState } from '../../store'
import {
  Board,
  InfoSquare,
  InputCategory,
  InputLetter,
  Row,
  Square,
  SquareInput,
} from '../../../common/components/boards'
import { flagColor } from '../../../common/utilities'

interface HandleBoardProps {
  player: Player
  coords: { x: number; y: number }
  setCoords: (coords: { x: number; y: number }) => void
}

export const HandleBoard: FunctionComponent<HandleBoardProps> = ({
  player,
  coords,
  setCoords,
}) => {
  const { boardDictionary, boardSettings } = useAppSelector(
    (state: RoomState) => state.room
  )
  const { categories, letters } = boardSettings

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
          const currentCategory = i === coords.x
          return (
            <Square empty highlight={currentCategory} key={i}>
              <InputCategory value={x} noStyle disabled />
            </Square>
          )
        })}
      </Row>
      {player.board.map((row, rowNr) => {
        const currentLetter = rowNr === coords.y
        return (
          <Row key={rowNr}>
            <Square empty firstInRow highlight={currentLetter}>
              <InputLetter value={letters[rowNr].toLocaleUpperCase()} noStyle disabled />
            </Square>
            {row.map((item, colNr) => {
              const highLightSquare = colNr == coords.x && rowNr === coords.y
              const word = player.board[rowNr][colNr].toLowerCase()
              const card = boardDictionary[rowNr][colNr][word]
              return (
                <Square
                  empty
                  key={colNr}
                  highlightSquare={highLightSquare}
                  onClick={() => setCoords({ x: colNr, y: rowNr })}
                >
                  <SquareInput color={flagColor(card.flag)} defaultValue={word}>
                    {word}
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
