import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  MissingInput,
  SmartNumericInput,
  SubmitButton,
} from '../../../../common/components/'
import { setNextPage, setTimeLimit } from '../../roomReducer'

export const TimeLimit: FunctionComponent = () => {
  const dispatch = useDispatch()
  // Default value: 2 seconds
  const [time, setTime] = useState(1)
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const validInput = time > 0

  const dispatchOnClick = () => {
    dispatch(setTimeLimit(time))
    dispatch(setNextPage())
  }

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      dispatchOnClick()
      e.preventDefault()
    }
  }

  return (
    <div className="room-time">
      <form>
        <SmartNumericInput onChange={setTime} onKeyPress={handleKeyPress} value={time} />
        <SubmitButton
          value="Submit"
          onClick={() => {
            validInput ? dispatchOnClick() : setReminder(!reminder)
          }}
        />
      </form>
      {reminder ? <MissingInput timeLimit={time} /> : null}
    </div>
  )
}
