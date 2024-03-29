import React, { FunctionComponent } from 'react'
import { Board, InfoSquare, Row, Square } from '../../../../common/components/boards'
import { useAppSelector } from '../../../hooks'
import { PlayerState } from '../../../store'
import { InputAnswer } from './styles'

interface InputBoardProps {
  // board: string[][]
  coords: { x: number; y: number }
  onInput: (ev: React.ChangeEvent<HTMLInputElement>) => void
  setCoords: (coords: { x: number; y: number }) => void
}

export const InputBoard: FunctionComponent<InputBoardProps> = ({
  // board,
  onInput,
  coords,
  setCoords,
}) => {
  const { boardSettings, playerBoard } = useAppSelector(
    (state: PlayerState) => state.player
  )
  const { categories, letters } = boardSettings
  return (
    <Board className="text-[60%]">
      <Row>
        <Square firstInRow>
          <InfoSquare>
            <span>{'Categories '}&rarr;</span>
            <span>{'Letters '}&darr;</span>
          </InfoSquare>
        </Square>
        {categories.map((category, i) => {
          return (
            <Square empty key={i}>
              {category}
            </Square>
          )
        })}
      </Row>
      {playerBoard.map((row, rowNr) => {
        return (
          <Row key={rowNr}>
            <Square empty firstInRow>
              {letters[rowNr].toLocaleUpperCase()}
            </Square>
            {row.map((word, colNr) => {
              const highLightSquare = colNr == coords.x && rowNr === coords.y

              return (
                <Square
                  key={colNr}
                  highlightSquare={highLightSquare}
                  onClick={() => setCoords({ x: colNr, y: rowNr })}
                >
                  <InputAnswer
                    value={word}
                    type="text"
                    placeholder={'...'}
                    highlightSquare={highLightSquare}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onInput(ev)}
                  />
                </Square>
              )
            })}
          </Row>
        )
      })}
    </Board>
  )
}
