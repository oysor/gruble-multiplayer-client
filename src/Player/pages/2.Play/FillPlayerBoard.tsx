import React, { FunctionComponent, useState } from 'react'
import { PlayerState } from '../../store'
import { InputBoard } from './playerInput/InputBoard'
import { updatePlayerBoard } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Box_l, Stack_l } from '../../../common/everyLayout'
import { InputWord } from './playerInput/InputWord'
import { BoardContainer } from '../../../common/components/boards'
import { InputOverlay } from './playerInput/styles'

export const FillPlayerBoard: FunctionComponent = () => {
  const { boardSettings, playerBoard } = useAppSelector(
    (state: PlayerState) => state.player
  )
  const dispatch = useAppDispatch()
  const [openField, setOpenField] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const { x, y } = coords
  const { categories, letters } = boardSettings

  // const nextLetter = () => {
  //   const nextLetter = y < letters.length - 1 ? y + 1 : 0
  //   setCoords({ y: nextLetter, x: x })
  // }

  // const previousLetter = () => {
  //   const prevLetter = y > 0 ? y - 1 : letters.length - 1
  //   setCoords({ y: prevLetter, x: x })
  // }

  // const nextCategory = (next?: number) => {
  //   if (Number.isFinite(next) && next !== undefined) {
  //     setCoords({ x: next, y: y })
  //   } else {
  //     const nextCategory = x < categories.length - 1 ? x + 1 : 0
  //     setCoords({ x: nextCategory, y: y })
  //   }
  // }

  // const previousCategory = (next?: number) => {
  //   if (Number.isFinite(next) && next !== undefined) {
  //     setCoords({ x: next, y: y })
  //   } else {
  //     const prevCategory = x > 0 ? x - 1 : categories.length - 1
  //     setCoords({ x: prevCategory, y: y })
  //   }
  // }

  // handle input change
  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    // deep copy array for every input
    const arr = [...Array(playerBoard.length)].map((a, i) => [...playerBoard[i]])
    arr[y][x] = value
    dispatch(updatePlayerBoard(arr))
  }

  const AddInput = (value: string) => {
    const arr = [...Array(playerBoard.length)].map((a, i) => [...playerBoard[i]])
    arr[y][x] = value
    dispatch(updatePlayerBoard(arr))
  }

  return (
    <div id="playing">
      <Stack_l space="3rem">
        <Box_l>
          {openField && (
            <InputOverlay>
              <InputWord
                word={playerBoard[y][x]}
                category={categories[x]}
                letter={letters[y]}
                addInput={AddInput}
                placeholder={letters[y] + '..'}
                showComponent={setOpenField}
              />
            </InputOverlay>
          )}
        </Box_l>
        <BoardContainer className="scrollbar">
          <InputBoard
            onInput={onInput}
            coords={coords}
            setCoords={setCoords}
            showInputField={setOpenField}
          />
        </BoardContainer>
      </Stack_l>
    </div>
  )
}
