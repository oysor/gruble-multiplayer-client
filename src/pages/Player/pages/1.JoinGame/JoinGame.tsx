import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNextPage, setPlayerName, setRoomId, toServer } from '../../playerReducer'
import { MissingInput, SmartInput, SubmitButton } from '../../../../common/components/'

export const JoinGame: FunctionComponent = () => {
  const [playerName, setplayerName] = useState('')
  const [roomId, setId] = useState('')
  // remind about missing input
  const [remind, setRemind] = useState(false)
  const validInput = playerName.length > 0 && roomId.length > 0
  const dispatch = useDispatch()
  const dispatchOnClick = () => {
    dispatch(setPlayerName(playerName))
    dispatch(setRoomId(roomId))
    dispatch({
      type: toServer.JoinRoom,
      payload: { roomId: roomId, playerName: playerName },
    })
    dispatch(setNextPage())
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
      {remind ? <MissingInput name={playerName} roomId={roomId} /> : null}
    </div>
  )
}
