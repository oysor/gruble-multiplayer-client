import React, { FunctionComponent, useEffect, useState } from 'react'
import { joinRoom, setNextPage } from '../../reducer'
import { Button, MissingInput, SmartInput } from '../../../common/components/'
import { PlayerState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Box_l, Center_l, Stack_l } from '../../../common/everyLayout'

export const JoinGame: FunctionComponent = () => {
  // Room id received from server
  const { roomId, serverMessage } = useAppSelector((state: PlayerState) => state.player)
  // Go to next page if room is received from server
  useEffect(() => {
    roomId !== '' && dispatch(setNextPage())
  })
  // Set playerName and roomId (to be sent to server)
  const [playerName, setplayerName] = useState('')
  const [inputRoomId, setId] = useState('')
  // remind about missing input
  const [remind, setRemind] = useState(false)
  const validInput = playerName.length > 0 && inputRoomId.length > 0
  const dispatch = useAppDispatch()
  
  const dispatchOnClick = () => {
    const roomId = inputRoomId.toUpperCase()
    dispatch(joinRoom({ roomId: roomId, playerName: playerName }))
  }

  return (
    <div className="join-room">
      <div className="header-logo">
        {/* <div>Name yourself and input the roomId</div> */}
      </div>
      <Box_l padding="1rem">
        <Center_l intrinsic className="mt-[1rem]">
          <Stack_l space="0.2rem">
            {/* <div>Set player name</div> */}
            <SmartInput
              value={playerName}
              onChange={setplayerName}
              placeholder={'player name..'}
              onBlur={() => {}}
            />
          </Stack_l>
        </Center_l>

        <Center_l intrinsic className="mt-[1rem]">
          <Stack_l space="0.2rem">
            {/* <div>Input room ID </div> */}
            <SmartInput onChange={setId} placeholder={'RoomId..'} onBlur={() => {}} />
          </Stack_l>
        </Center_l>

        <Center_l intrinsic className="mt-[2rem]">
          <Button
            onClick={() => {
              validInput ? dispatchOnClick() : setRemind(!remind)
            }}
          >
            Join room
          </Button>
          <div className="h-[2rem] text-center">
            {serverMessage !== '' ? <span>{serverMessage}</span> : null}
            {remind ? <MissingInput name={playerName} roomId={inputRoomId} /> : null}
          </div>
        </Center_l>
      </Box_l>
    </div>
  )
}
