import React, { FunctionComponent, useState } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { Headline, UnderHeadline } from './styles'
import { PondrInput } from '../../../common/components/inputs/SmartInput'
import { setRoomName } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RoomState } from '../../store'
import Maskot2 from '../../../assets/svg/maskot_2.svg'

export const NameInput: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { roomName } = useAppSelector((state: RoomState) => state.room)
  const [name, setName] = useState(roomName)
  const nameValid = roomName.length > 1

  const handleNameBlur = (): void => {
    if (name.length > 0 && name != roomName) {
      dispatch(setRoomName(name))
    }
  }

  return (
    <div className="flex flex-col h-[100%] justify-around">
      <Stack_l className="text-center h-[6rem]">
        <Headline>Name</Headline>
        <UnderHeadline className="self-center text-center max-w-[13em]">
          {!nameValid
            ? 'Create name for the room!'
            : 'What a great name! Move on to the next step.'}
        </UnderHeadline>
      </Stack_l>
      <div className="mt-[1rem] text-center">
        <PondrInput
          value={name}
          onChange={setName}
          placeholder={'Enter room name'}
          onBlur={handleNameBlur}
          className="w-[10em]"
        />
      </div>
      {<Maskot2 maxwidth="100%" height="10rem" />}
    </div>
  )
}
