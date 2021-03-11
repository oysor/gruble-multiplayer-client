import React, { FunctionComponent, useState } from 'react'
import { CreateRoom } from '../3.CreateRoom'
import {
  MissingInput,
  SmartNumericInput,
  SubmitButton,
} from '../../../../common/components/'

type TimeLimitProps = {
  name: string
}

export const TimeLimit: FunctionComponent<TimeLimitProps> = (props) => {
  // Default value: 2 seconds
  const [time, setTime] = useState(1)
  // Next page/component
  const [nextPage, setNext] = useState(false)
  const { name } = props
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const validInput = time > 0

  return !nextPage ? (
    <div className="room-time">
      <form>
        <SmartNumericInput onChange={setTime} value={time} />
        <SubmitButton
          value="Submit"
          onClick={() => {
            validInput ? setNext(true) : setReminder(!reminder)
          }}
        />
      </form>
      {reminder ? <MissingInput timeLimit={time} /> : null}
    </div>
  ) : (
    <CreateRoom name={name} time={time} />
  )
}
