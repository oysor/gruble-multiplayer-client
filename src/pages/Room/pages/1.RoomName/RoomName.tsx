import React, { FunctionComponent, useState } from 'react'
import { TimeLimit } from '../2.TimeLimit'
import { MissingInput, SmartInput, SubmitButton } from '../../../../common/components/'

export const RoomName: FunctionComponent = () => {
  // Set room name
  const [name, setName] = useState('')
  // Next component
  const [nextPage, setNext] = useState(true)

  const validInput = name.length !== 0
  const [reminder, setReminder] = useState(false)

  return nextPage ? (
    <div className="room-name">
      <form>
        <SmartInput onChange={setName} placeholder={'room name...'} />
        <SubmitButton
          value="Submit"
          onClick={() => {
            validInput ? setNext(false) : setReminder(!reminder)
          }}
        />
      </form>
      {reminder ? <MissingInput name={name} /> : null}
    </div>
  ) : (
    <TimeLimit name={name} />
  )
}
