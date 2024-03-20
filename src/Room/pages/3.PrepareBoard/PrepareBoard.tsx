import React, { FunctionComponent, useState } from 'react'
import { createRoom, setNextPage } from '../../reducer'
import { Button, MissingInput, SmartNumericInput } from '../../../common/components'
import { InputCategories } from './InputCategories'
import { RoomState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { CreateBoard } from './CreateBoard'
import { Box_l, Center_l, Cluster_l, Stack_l } from '../../../common/everyLayout'
import { InputLetters } from './InputLetters'

export const PrepareBoard: FunctionComponent = () => {
  const { roomName } = useAppSelector((state: RoomState) => state.room)
  const dispatch = useAppDispatch()

  const [time, setTime] = useState(3)

  const validNumericInput = time > 1

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      dispatchOnClick()
      e.preventDefault()
    }
  }

  // input categories
  const [categoryList, setCategoryList] = useState(['Spiselig', 'Land', 'Fugler'])
  // input lettes
  const norskeAlfabetet = 'abcdefghijklmnopqrstuvwxyzøæå'.split('')
  const [letterList, setLetterList] = useState(['a', 'b', 'l'])

  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const containEmptyString = (element: string) => element === ''
  const validInput =
    !categoryList.some(containEmptyString) && !letterList.some(containEmptyString)
  // const validInput = categoryList[0].length > 0

  const dispatchOnClick = () => {
    if (validNumericInput) {
      dispatch(
        createRoom({
          RoomName: roomName,
          TimeLimit: time,
          BoardSettings: {
            Categories: categoryList,
            Letters: letterList.slice(0, categoryList.length),
          },
        })
      ),
        dispatch(setNextPage())
    }
  }

  return (
    <Box_l>
      <Stack_l space="2rem">
        <Box_l className="h-[6rem]">
          <Center_l intrinsic>
            <Button
              onClick={() => {
                validInput ? dispatchOnClick() : setReminder(true)
              }}
            >
              Create Room
            </Button>
            {reminder ? <MissingInput missingBaordInput={true} /> : null}
            {!validNumericInput ? <MissingInput timeLimit={time} /> : null}
          </Center_l>
        </Box_l>

        <Stack_l space="0.2rem" className="self-center">
          <div className="text-xl">Set time limit</div>
          <div>
            <SmartNumericInput
              onChange={setTime}
              onKeyPress={handleKeyPress}
              value={time}
              className="w-[10rem]"
            />
          </div>
        </Stack_l>

        <Center_l intrinsic>
          <Cluster_l justify="center" align="start">
            <Stack_l space="0.5rem">
              <div className="self-center">Categories</div>
              <InputCategories inputList={categoryList} setInputList={setCategoryList} />
            </Stack_l>
            <Stack_l space="0.5rem">
              <div className="self-center">Letters</div>
              <InputLetters inputList={letterList} setInputList={setLetterList} />
            </Stack_l>
          </Cluster_l>
        </Center_l>
        <Center_l intrinsic>
          <CreateBoard
            categoryList={categoryList}
            setCategoryList={setCategoryList}
            letterList={letterList}
            setLetterList={setLetterList}
          />
        </Center_l>
      </Stack_l>
    </Box_l>
  )
}
