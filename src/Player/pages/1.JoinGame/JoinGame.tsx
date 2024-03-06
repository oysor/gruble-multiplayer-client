import React, { FunctionComponent, useEffect, useState } from 'react'
import { joinRoom, setNextPage } from '../../reducer'
import { MissingInput, SmartInput, SubmitButton } from '../../../common/components/'
import { PlayerState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Box_l, Stack_l } from '../../../common/everyLayout'

export const JoinGame: FunctionComponent = () => {
  // Room id received from server
  const { roomId, serverMessage } = useAppSelector((state: PlayerState) => state.player)
  // Go to next page if room is received from server
  useEffect(() => {
    roomId !== '' && dispatch(setNextPage())
  })
  // Set playerName and roomId (to be sent to server)
  const [playerName, setplayerName] = useState('Bjarne')
  const [inputRoomId, setId] = useState('')
  // remind about missing input
  const [remind, setRemind] = useState(false)
  const validInput = playerName.length > 0 && inputRoomId.length > 0
  const dispatch = useAppDispatch()
  const dispatchOnClick = () => {
    dispatch(joinRoom({ roomId: inputRoomId, playerName: playerName }))
  }

  return (
    <div className="join-room">
      <div className="header-logo">
        <div>Name yourself and input the roomId</div>
      </div>
      <Box_l padding="1rem">
        <Stack_l>
          <SmartInput
            value={playerName}
            onChange={setplayerName}
            placeholder={'player name..'}
          />
          <SmartInput onChange={setId} placeholder={'RoomId..'} />
          <SubmitButton
            onClick={() => {
              validInput ? dispatchOnClick() : setRemind(!remind)
            }}
            value={'Join room'}
          />
        </Stack_l>
      </Box_l>
      {remind ? <MissingInput name={playerName} roomId={inputRoomId} /> : null}
      {serverMessage !== '' ? serverMessage : null}
    </div>
  )
}
