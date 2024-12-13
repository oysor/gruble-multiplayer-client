import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { PondrInput } from '../../../common/components/inputs/SmartInput'
import { Headline, InfoText1 } from '../../../common/components'

interface CreateRoom {
  name: string
  setName: (name: string) => void
}

export const CreateRoom: FunctionComponent<CreateRoom> = ({ setName, name }) => {
  const nameValid = name.length > 2

  return (
    <div className="flex flex-col h-[100%]">
      <Stack_l className="text-center h-[6rem]">
        <Headline>Name</Headline>
        <InfoText1 className="self-center text-center">
          {!nameValid
            ? 'Create name for the room!'
            : 'What a great name! Move on to the next step.'}
        </InfoText1>
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
  )
}
