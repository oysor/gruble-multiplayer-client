import React, { FunctionComponent, useState } from 'react'
import { Box_l, Stack_l } from '../../common/everyLayout'

interface CopyIdBoxProps {
  roomId: string
}

export const CopyIdBox: FunctionComponent<CopyIdBoxProps> = ({ roomId }) => {
  const [copied, setCopied] = useState(false)

  return (
    <Box_l>
      <Stack_l space="0.1rem" align="center">
        <Box_l
          borderColor={copied ? 'black' : '#ff99bb'}
          borderWidth="0.1rem"
          borderStyle="dotted"
          className="text-center cursor-pointer px-[0.5rem] pb-[0.2rem]"
          onClick={() => {
            navigator.clipboard.writeText(roomId)
            setCopied(true)
          }}
        >
          <span className="underline-offset-0 text-[0.5rem]">
            {roomId ? roomId : '....'}
          </span>
        </Box_l>
      </Stack_l>
    </Box_l>
  )
}
