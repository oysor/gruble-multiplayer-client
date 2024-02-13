import React, { FunctionComponent, useState } from 'react'
import {
  MissingInput,
  SmartNumericInput,
  SubmitButton,
} from '../../../../common/components/'
import { setNextPage, setTimeLimit } from '../../roomReducer'
import { useAppDispatch } from '../../roomHooks'

export const TimeLimit: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  // Default value: 2 seconds
  const [time, setTime] = useState(30)
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
      <span className="reminder">Set time limit</span>
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
