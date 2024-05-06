import React from 'react'
import { FunctionComponent } from 'react'
import { ConnectionMode } from '../../constants'
import { Box_l, Cover_l, Imposter_l } from '../../everyLayout'
import { ConnectionStatus } from './ConnectionStatus'

interface DisconnectOverlayProps {
  status: ConnectionMode
}

export const DisconnectOverlay: FunctionComponent<DisconnectOverlayProps> = ({
  status,
}) => {
  return (
    <Imposter_l fixed breakout={true} className=" bg-[#03484f]/[.5] z-10">
      <Cover_l>
        <Box_l className=" w-[100vw]">{/* <ConnectionStatus status={status} /> */}</Box_l>
      </Cover_l>
    </Imposter_l>
  )
}
