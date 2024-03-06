import React, { FunctionComponent, useState } from 'react'
import { createRoom, setNextPage } from '../../reducer'
import { Button, MissingInput } from '../../../common/components'
import { InputCategories } from './InputCategories'
import { RoomState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { CreateBoard } from './CreateBoard'
import { Box_l, Center_l, Stack_l } from '../../../common/everyLayout'

export const PrepareBoard: FunctionComponent = () => {
  const { roomName, timeLimit } = useAppSelector((state: RoomState) => state.room)
  const dispatch = useAppDispatch()
  // input categories
  const [categoryList, setCategoryList] = useState(['Spiselig', 'Land', 'Fugler'])
  // input lettes
  const norskeAlfabetet = 'abcdefghijklmnopqrstuvwxyzøæå'.split('')
  const [letterList, setLetterList] = useState(norskeAlfabetet)

  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const containEmptyString = (element: string) => element === ''
  const validInput = !categoryList.some(containEmptyString)
  // const validInput = categoryList[0].length > 0

  const dispatchOnClick = () => {
    dispatch(
      createRoom({
        RoomName: roomName,
        TimeLimit: timeLimit,
        BoardSettings: {
          Categories: categoryList,
          Letters: letterList.slice(0, categoryList.length),
        },
      })
    ),
      dispatch(setNextPage())
  }

  return (
    <Box_l>
      <Stack_l space="2rem">
        <Center_l>
          {/* <h2>Create a game board.</h2> */}

          <Button
            onClick={() => {
              validInput ? dispatchOnClick() : setReminder(true)
            }}
          >
            Create Room
          </Button>
          {reminder ? <MissingInput categoryList={categoryList} /> : null}
        </Center_l>
        <Center_l>
          <InputCategories inputList={categoryList} setInputList={setCategoryList} />
        </Center_l>

        <CreateBoard
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          letterList={letterList}
          setLetterList={setLetterList}
        />
      </Stack_l>
    </Box_l>
  )
}
