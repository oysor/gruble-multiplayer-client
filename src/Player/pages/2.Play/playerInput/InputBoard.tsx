import React, { FunctionComponent } from 'react'
import {
  Board,
  HeadingColumn,
  HeadingRow,
  InfoSquare,
  Row,
  Square,
} from '../../../../common/components/boards'
import { useAppSelector } from '../../../hooks'
import { PlayerState } from '../../../store'
import { InputAnswer } from './styles'

interface InputBoardProps {
  // board: string[][]
  coords: { x: number; y: number }
  onInput: (ev: React.ChangeEvent<HTMLInputElement>) => void
  setCoords: (coords: { x: number; y: number }) => void
  showInputField: (value: boolean) => void
}

export const InputBoard: FunctionComponent<InputBoardProps> = ({
  // board,
  onInput,
  coords,
  setCoords,
  showInputField,
}) => {
  const { boardSettings, playerBoard } = useAppSelector(
    (state: PlayerState) => state.player
  )
  const { categories, letters } = boardSettings
  const uniformCasing = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
  }
  return (
    <Board className="text-[60%]">
      <Row>
        <Square firstInRow>
          <InfoSquare>
            {/* <span>{'Categories '}&rarr;</span>
            <span>{'Letters '}&darr;</span> */}
          </InfoSquare>
        </Square>
        {categories.map((category, i) => {
          return (
            <Square empty key={i}>
              <HeadingColumn>{category}</HeadingColumn>
            </Square>
          )
        })}
      </Row>
      {playerBoard.map((row, rowNr) => {
        return (
          <Row key={rowNr}>
            <Square empty firstInRow>
              <HeadingRow>{letters[rowNr].toLocaleUpperCase()}</HeadingRow>
            </Square>
            {row.map((word, colNr) => {
              const currentSquare = colNr == coords.x && rowNr === coords.y
              const emptyInput = word.length > 0

              return (
                <Square
                  key={colNr}
                  highlightOnClick={currentSquare}
                  highlightOnInput={emptyInput}
                  onClick={() => {
                    setCoords({ x: colNr, y: rowNr })
                    showInputField(true)
                  }}
                  onFocus={() => setCoords({ x: colNr, y: rowNr })}
                >
                  <InputAnswer
                    contentEditable={true}
                    spellCheck="false"
                    suppressContentEditableWarning={true}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onInput(ev)}
                  >
                    {uniformCasing(word)}
                  </InputAnswer>
                </Square>
              )
            })}
          </Row>
        )
      })}
    </Board>
  )
}
