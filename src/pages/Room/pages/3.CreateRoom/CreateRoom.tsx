import React, { FunctionComponent, useState } from 'react'
import { StartGame } from '../4.StartGame'
import { useDispatch } from 'react-redux'
import { toServer } from '../../roomReducer'
import { Button, MissingInput } from '../../../../common/components/'
import { InputCategories } from './InputCategories'

type CreateRoomProps = {
  name: string
  time: number
}

export const CreateRoom: FunctionComponent<CreateRoomProps> = (props) => {
  const { name, time } = props
  // Next component
  const [nextPage, setNext] = useState(true)

  // input categories
  const [categoryList, setCategoryList] = useState([''])

  const dispatch = useDispatch()

  const validInput = categoryList[0].length > 0
  const [reminder, setReminder] = useState(false)

  const dispatchOnClick = () => {
    dispatch({
      type: toServer.CreateRoom,
      payload: {
        RoomName: name,
        TimeLimit: time,
        BoardSettings: {
          Categories: categoryList,
        },
      },
    })
    setNext(false)
  }

  return nextPage ? (
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
  ) : (
    <StartGame />
  )
}
