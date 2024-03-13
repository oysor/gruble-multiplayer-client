import React from 'react'
import { FunctionComponent } from 'react'
import { ConnectionMode } from '../../constants'
import { Box_l, Cover_l, Imposter_l } from '../../everyLayout'
import { ConnectionStatus } from './ConnectionStatus'

interface DisconnectedCoverProps {
  status: ConnectionMode
}

export const DisconnectedCover: FunctionComponent<DisconnectedCoverProps> = ({
  status,
}) => {
  return (
    <Imposter_l breakout={true} className=" bg-[#03484f]/[.5] z-10">
      <Cover_l>
        <Box_l className=" w-[100vw]">{/* <ConnectionStatus status={status} /> */}</Box_l>
      </Cover_l>
    </Imposter_l>
  )
}
