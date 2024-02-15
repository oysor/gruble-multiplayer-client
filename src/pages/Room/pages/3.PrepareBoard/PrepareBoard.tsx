import React, { FunctionComponent, useState } from 'react'
import { createRoom, setNextPage } from '../../roomReducer'
import { Button, MissingInput } from '../../../../common/components'
import { InputCategories } from './InputCategories'
import { RoomState } from '../../roomStore'
import { useAppDispatch, useAppSelector } from '../../roomHooks'

import { CreateBoard } from './CreateBoard'
import { Box_l, Stack_l } from '../../../../common/styledComponents/everyLayout'

export const PrepareBoard: FunctionComponent = () => {
  const { roomName, timeLimit } = useAppSelector((state: RoomState) => state.room)
  const dispatch = useAppDispatch()
  // input categories
  const [categoryList, setCategoryList] = useState([''])
  // input lettes
  const norskeAlfabetet = 'abcdefghijklmnopqrstuvwxyzøæå'.split('')
  const [letterList, setLetterList] = useState(norskeAlfabetet)

  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const validInput = categoryList[0].length > 0

  const dispatchOnClick = () => {
    dispatch(
      createRoom({
        RoomName: roomName,
        TimeLimit: timeLimit,
        BoardSettings: {
          Categories: categoryList,
          Letters: letterList,
        },
      })
    ),
      dispatch(setNextPage())
  }

  return (
    <Box_l>
      <Stack_l space="2rem">
        <InputCategories inputList={categoryList} setInputList={setCategoryList} />
        <CreateBoard
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          letterList={letterList}
          setLetterList={setLetterList}
        />
        <Button
          onClick={() => {
            validInput ? dispatchOnClick() : setReminder(true)
          }}
        >
          Create Room
        </Button>
        {reminder ? <MissingInput categoryList={categoryList} /> : null}
      </Stack_l>
    </Box_l>
  )
}
