import React, { FunctionComponent, useState } from 'react'
import {
  MissingInput,
  SmartInput,
  SmartNumericInput,
  SubmitButton,
} from '../../../../common/components/'
import { setNextPage, setRoomName, setTimeLimit } from '../../roomReducer'
import { useAppDispatch } from '../../roomHooks'
import { Box_l, Stack_l } from '../../../../common/styledComponents/everyLayout'

export const PrepareRoom: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  // Default value: 2 seconds
  const [time, setTime] = useState(1)
  const [name, setName] = useState('kuk')

  const validNumericInput = time > 0
  const validTextInput = name.length !== 0

  const dispatchOnClick = () => {
    dispatch(setTimeLimit(time))
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
    <div>
      <div>Name your room and set a time limit.</div>
      <Box_l padding="1rem">
        {/* <span className="reminder">Set time limit</span> */}
        <Stack_l>
          <SmartNumericInput
            onChange={setTime}
            onKeyPress={handleKeyPress}
            value={time}
          />
          <SmartInput
            value={name}
            onChange={setName}
            placeholder={'room name...'}
            onKeyPress={handleKeyPress}
          />
          <SubmitButton
            value="Submit"
            onClick={() => {
              if (validTextInput && validNumericInput) {
                dispatchOnClick()
              }
            }}
          />
        </Stack_l>
      </Box_l>
      {!validNumericInput ? <MissingInput timeLimit={time} /> : null}
      {!validTextInput ? <MissingInput roomId={name} /> : null}
    </div>
  )
}
