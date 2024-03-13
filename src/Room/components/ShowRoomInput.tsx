import React, { FunctionComponent, useState } from 'react'
import { RoomState } from '../store'
import { useAppSelector } from '../hooks'
import { Box_l, Stack_l } from '../../common/everyLayout'

export const ShowRoomInput: FunctionComponent = () => {
  const { roomId, roomName } = useAppSelector((state: RoomState) => state.room)

  const [copied, setCopied] = useState(false)
  const heading = roomName.charAt(0).toUpperCase() + roomName.slice(1)

  return (
    <Box_l padding="1rem">
      <Stack_l space="0.2rem">
        <h2 className="text-center">{heading}</h2>
        {copied ? <span>Copied!</span> : <span>Click to copy..</span>}
        <Box_l
          borderColor={copied ? 'black' : '#ff99bb'}
          borderWidth="0.1rem"
          padding="1rem"
          className="w-[10rem] text-center cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(roomId)
            setCopied(true)
          }}
        >
          <b>{roomId ?? 'loading..'}</b>
        </Box_l>
      </Stack_l>
    </Box_l>
  )
}
