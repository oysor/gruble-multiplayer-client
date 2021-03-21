import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MissingInput, SmartInput, SubmitButton } from '../../../../common/components/'
import { setNextPage, setRoomName } from '../../roomReducer'

export const RoomName: FunctionComponent = () => {
  const dispatch = useDispatch()
  // Set room name
  const [name, setName] = useState('')
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const validInput = name.length !== 0

  const dispatchOnClick = () => {
    dispatch(setRoomName(name))
    dispatch(setNextPage())
  }

  return (
    <div className="room-name">
      <form>
        <SmartInput onChange={setName} placeholder={'room name...'} />
        <SubmitButton
          value="Submit"
          onClick={() => {
            validInput ? dispatchOnClick() : setReminder(!reminder)
          }}
        />
      </form>
      {reminder ? <MissingInput name={name} /> : null}
    </div>
  )
}
