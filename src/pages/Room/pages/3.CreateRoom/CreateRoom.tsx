import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextPage, toServer } from '../../roomReducer'
import { Button, MissingInput } from '../../../../common/components/'
import { InputCategories } from './InputCategories'
import { RoomState } from '../../roomStore'

export const CreateRoom: FunctionComponent = () => {
  const { roomName, timeLimit } = useSelector((state: RoomState) => state.room)
  const dispatch = useDispatch()
  // input categories
  const [categoryList, setCategoryList] = useState([''])
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const validInput = categoryList[0].length > 0

  const dispatchOnClick = () => {
    dispatch({
      type: toServer.CreateRoom,
      payload: {
        RoomName: roomName,
        TimeLimit: timeLimit,
        BoardSettings: {
          Categories: categoryList,
        },
      },
    })
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
