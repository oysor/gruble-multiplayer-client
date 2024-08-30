import React, { FunctionComponent, useState } from 'react'
import { PlayerState } from '../../store'
import { InputBoard } from './playerInput/InputBoard'
import { updatePlayerBoard } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Box_l, Center_l, Stack_l } from '../../../common/everyLayout'

import { PlayerCountDown } from '../../components/PlayerCountDown'
import { InputWord } from './playerInput/InputWord'
import { Button } from '../../../common/components'

export const FillPlayerBoard: FunctionComponent = () => {
  const { boardSettings, playerBoard } = useAppSelector(
    (state: PlayerState) => state.player
  )
  const dispatch = useAppDispatch()
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const { x, y } = coords
  const { categories, letters } = boardSettings

  const nextLetter = () => {
    const nextLetter = y < letters.length - 1 ? y + 1 : 0
    setCoords({ y: nextLetter, x: x })
  }

  const previousLetter = () => {
    const prevLetter = y > 0 ? y - 1 : letters.length - 1
    setCoords({ y: prevLetter, x: x })
  }

  const nextCategory = (next?: number) => {
    if (Number.isFinite(next) && next !== undefined) {
      setCoords({ x: next, y: y })
    } else {
      const nextCategory = x < categories.length - 1 ? x + 1 : 0
      setCoords({ x: nextCategory, y: y })
    }
  }

  const previousCategory = (next?: number) => {
    if (Number.isFinite(next) && next !== undefined) {
      setCoords({ x: next, y: y })
    } else {
      const prevCategory = x > 0 ? x - 1 : categories.length - 1
      setCoords({ x: prevCategory, y: y })
    }
  }

  // handle input change
  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    // deep copy array for every input
    const arr = [...Array(playerBoard.length)].map((a, i) => [...playerBoard[i]])
    arr[y][x] = value
    dispatch(updatePlayerBoard(arr))
  }

  return (
    <div id="playing">
      <Stack_l space="3rem">
        <Center_l className="mb-2rem">
          <PlayerCountDown />
        </Center_l>
        <Center_l>
          <Box_l>
            {/* <div className="self-center">
              {categories[x].toUpperCase() + ' på ' + letters[y].toUpperCase()}
            </div> */}
            <InputWord
              word={playerBoard[y][x]}
              onInput={onInput}
              placeholder={
                categories[x].toUpperCase() + ' på ' + letters[y].toUpperCase()
              }
            />
            <Box_l className="text-[0.7rem]">
              <Button onClick={previousCategory}>&larr; Previous</Button>
              <Button onClick={nextCategory}>Next &rarr;</Button>
              <Button onClick={nextLetter}>Down &darr;</Button>
              <Button onClick={previousLetter}>Up &uarr;</Button>
            </Box_l>
          </Box_l>
        </Center_l>
        <Box_l className="overflow-x-scroll">
          <InputBoard onInput={onInput} coords={coords} setCoords={setCoords} />
        </Box_l>
      </Stack_l>
    </div>
  )
}
