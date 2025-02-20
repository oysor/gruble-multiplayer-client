import { FunctionComponent, useState } from 'react'
import { useAppSelector } from '../hooks'
import { PlayerState } from '../store'
import { Box_l, Stack_l } from '../../common/everyLayout'
import React from 'react'
import { CopyBox } from '../../common/components/CopyBox'

export const PlayerIdCopyBox: FunctionComponent = () => {
  const { roomId } = useAppSelector((state: PlayerState) => state.player)
  const [copied, setCopied] = useState(false)
  return (
    <CopyBox>
      <Stack_l space="0.2rem" align="center">
        {/* <h2 className="text-center">{heading}</h2> */}
        <span className="text-xs text-center">
          {copied ? 'Copied!' : 'Code to join the game:'}
        </span>
        <Box_l
          borderColor={copied ? 'black' : '#ff99bb'}
          borderWidth="0.1rem"
          borderStyle="dotted"
          padding="1rem"
          className="w-[10rem] text-center cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(roomId)
            setCopied(true)
          }}
        >
          <b>{roomId ? roomId : '....'}</b>
        </Box_l>
      </Stack_l>
    </CopyBox>
  )
}
