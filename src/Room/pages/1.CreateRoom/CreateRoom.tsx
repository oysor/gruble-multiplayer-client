import React, { FunctionComponent, useState } from 'react'
import { Cluster_l, Stack_l } from '../../../common/everyLayout'
import { PondrInput } from '../../../common/components/inputs/SmartInput'
import { createRoom, setNextPage } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RoomState } from '../../store'
import { PondrButton } from '../../../common/components/buttons'
import { Headline, UnderHeadline } from './styles'

export const CreateRoom: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { roomName } = useAppSelector((state: RoomState) => state.room)
  const [name, setName] = useState(roomName)
  const nameValid = name.length > 2 && name !== roomName

  const createRoomOnClick = () => {
    if (nameValid) {
      dispatch(createRoom(name))
      dispatch(setNextPage())
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <div className="flex-1 ">
        <div className="flex flex-col h-[100%]">
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
              className="w-[10em]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex-1 flex flex-col">
          <Cluster_l justify="center" align="end" className="mb-[1rem]">
            <PondrButton
              invert
              onClick={() => {
                history.back()
              }}
            >
              Exit
            </PondrButton>

            <PondrButton
              blurred={!nameValid}
              disabled={!nameValid}
              valid={!nameValid}
              onClick={() => createRoomOnClick()}
            >
              Next
            </PondrButton>
          </Cluster_l>
        </div>
      </div>
    </div>
  )
}
