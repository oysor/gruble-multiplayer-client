import React, { FunctionComponent, useState } from 'react'
import { Button, MissingInput, SmartInput } from '../../../common/components'
import { setNextPage, setRoomName } from '../../reducer'
import { useAppDispatch } from '../../hooks'
import { Box_l, Center_l, Stack_l } from '../../../common/everyLayout'

export const PrepareRoom: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [reminder, setReminder] = useState(false)

  const validTextInput = name.length !== 0

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
    <div>
      <Box_l padding="1rem" className="h-[18rem]">
        <Center_l intrinsic className="mt-[2rem]">
          <Stack_l space="0.2rem">
            <div>Set room name</div>
            <div>
              <SmartInput
                value={name}
                onChange={setName}
                placeholder={'room name...'}
                onKeyPress={handleKeyPress}
                className="w-[13rem]"
              />
            </div>
          </Stack_l>
        </Center_l>
        <Center_l intrinsic className="mt-[2rem]">
          <Button
            onClick={() => {
              validTextInput ? dispatchOnClick() : setReminder(true)
            }}
          >
            Submit
          </Button>
        </Center_l>
        {reminder ? <MissingInput roomId={name} /> : null}
      </Box_l>
    </div>
  )
}
