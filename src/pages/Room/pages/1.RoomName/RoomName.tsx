import React, { FunctionComponent, useState } from 'react'
import { MissingInput, SmartInput, SubmitButton } from '../../../../common/components/'
import { setNextPage, setRoomName } from '../../roomReducer'
import { useAppDispatch } from '../../roomHooks'

export const RoomName: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  // Set room name
  const [name, setName] = useState('')
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const validInput = name.length !== 0

  const dispatchOnClick = () => {
    dispatch(setRoomName(name))
    dispatch(setNextPage())
  }

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      dispatchOnClick()
      e.preventDefault()
    }
  }

  return (
    <div className="room-name">
      {reminder ? <MissingInput name={name} /> : null}
      <form className="input-field">
        <SmartInput
          onChange={setName}
          placeholder={'room name...'}
          onKeyPress={handleKeyPress}
        />
        <SubmitButton
          value="Submit"
          onClick={() => {
            validInput ? dispatchOnClick() : setReminder(!reminder)
          }}
        />
      </form>
    </div>
  )
}
