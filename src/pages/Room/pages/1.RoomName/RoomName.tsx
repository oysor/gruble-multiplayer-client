import React, { FunctionComponent, useState } from 'react'
import { TimeLimit } from '../2.TimeLimit'
import { MissingInput, SmartInput, SubmitButton } from '../../../../common/components/'

export const RoomName: FunctionComponent = () => {
  // Set room name
  const [name, setName] = useState('')
  // Next page/component
  const [nextPage, setNext] = useState(false)
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const validInput = name.length !== 0

  return !nextPage ? (
    <div className="room-name">
      <form>
        <SmartInput onChange={setName} placeholder={'room name...'} />
        <SubmitButton
          value="Submit"
          onClick={() => {
            validInput ? setNext(true) : setReminder(!reminder)
          }}
        />
      </form>
      {reminder ? <MissingInput name={name} /> : null}
    </div>
  ) : (
    <TimeLimit name={name} />
  )
}
