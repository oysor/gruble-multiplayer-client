import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { PondrInput } from '../../../common/components/inputs/SmartInput'
import { Headline, InfoText1 } from '../../../common/components'

interface EnterCode {
  setCode: (code: string) => void
  roomCode: string
  msg: string
}

export const EnterCode: FunctionComponent<EnterCode> = ({ setCode, roomCode, msg }) => {
  return (
    <div className="flex flex-col h-[100%]">
      <Stack_l className="text-center h-[6rem]">
        <Headline>Enter code</Headline>
        {/* <InfoText1 className="self-center text-center">Enter code to join</InfoText1> */}
      </Stack_l>
      <div className="mt-[1rem] text-center">
        <PondrInput
          value={roomCode}
          onChange={setCode}
          placeholder={'Room code'}
          className="w-[10em]"
        />
        <InfoText1 className="self-center text-center mt-[0.5rem]">
          {msg !== '' ? <span>{msg}</span> : null}
        </InfoText1>
      </div>
    </div>
  )
}
