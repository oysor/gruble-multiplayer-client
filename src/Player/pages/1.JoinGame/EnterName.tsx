import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { PondrInput } from '../../../common/components/inputs/SmartInput'
import { Headline, InfoText1 } from '../../../common/components'

interface EnterName {
  setName: (code: string) => void
  username: string
}

export const EnterName: FunctionComponent<EnterName> = ({ setName, username }) => {
  return (
    <div className="flex flex-col h-[100%]">
      <Stack_l className="text-center h-[6rem]">
        <Headline>Your username</Headline>
        <InfoText1 className="self-center text-center">
          Create a username to join
        </InfoText1>
      </Stack_l>
      <div className="mt-[1rem] text-center">
        <PondrInput
          value={username}
          onChange={setName}
          placeholder={'username'}
          className="w-[10em]"
        />
      </div>
    </div>
  )
}
