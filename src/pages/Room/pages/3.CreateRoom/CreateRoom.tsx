import React, { FunctionComponent, useState } from 'react'
import { createRoom, setNextPage } from '../../roomReducer'
import { Button, MissingInput } from '../../../../common/components/'
import { InputCategories } from './InputCategories'
import { RoomState } from '../../roomStore'
import { useAppDispatch, useAppSelector } from '../../roomHooks'

export const CreateRoom: FunctionComponent = () => {
  const { roomName, timeLimit } = useAppSelector((state: RoomState) => state.room)
  const dispatch = useAppDispatch()
  // input categories
  const [categoryList, setCategoryList] = useState([''])
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
        },
      })
    ),
      dispatch(setNextPage())
  }

  return (
    <div className="room-create">
      <InputCategories inputList={categoryList} setInputList={setCategoryList} />
      <Button
        onClick={() => {
          validInput ? dispatchOnClick() : setReminder(!reminder)
        }}
      >
        Create Room
      </Button>
      {reminder ? <MissingInput categoryList={categoryList} /> : null}
    </div>
  )
}
