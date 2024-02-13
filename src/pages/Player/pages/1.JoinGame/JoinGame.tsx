import React, { FunctionComponent, useEffect, useState } from 'react'
import { joinRoom, setNextPage } from '../../playerReducer'
import { MissingInput, SmartInput, SubmitButton } from '../../../../common/components/'
import { PlayerState } from '../../playerStore'
import { useAppDispatch, useAppSelector } from '../../playerHooks'

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
    dispatch(joinRoom({ roomId: inputRoomId, playerName: playerName }))
  }

  return (
    <div className="join-room">
      <form className="input-join-room">
        <SmartInput onChange={setplayerName} placeholder={'player name..'} />
        <SmartInput onChange={setId} placeholder={'RoomId..'} />
        <SubmitButton
          onClick={() => {
            validInput ? dispatchOnClick() : setRemind(!remind)
          }}
          value={'Join room'}
        />
      </form>
      {remind ? <MissingInput name={playerName} roomId={inputRoomId} /> : null}
      {serverMessage !== '' ? serverMessage : null}
    </div>
  )
}
