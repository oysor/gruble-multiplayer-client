import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPlayerName, setRoomId, toServer } from '../../playerReducer'
import { MissingInput, SmartInput, SubmitButton } from '../../../../common/components/'
import { Play } from '../Play'

export const JoinGame: FunctionComponent = () => {
  const [name, setName] = useState('')
  const [roomId, setId] = useState('')
  // remind about missing input
  const [remind, setRemind] = useState(false)
  const validInput = name.length > 0 && roomId.length > 0

  const dispatch = useDispatch()

  // Next component
  const [nextPage, setNext] = useState(true)

  const dispatchOnClick = () => {
    dispatch(setPlayerName(name))
    dispatch(setRoomId(roomId))
    dispatch({
      type: toServer.JoinRoom,
      payload: { roomId: roomId, playerName: name },
    })
    setNext(false)
  }

  return nextPage ? (
    <div className="join-room">
      <form className="input-join-room">
        <SmartInput onChange={setName} placeholder={'player name..'} />
        <SmartInput onChange={setId} placeholder={'RoomId..'} />
        <SubmitButton
          onClick={() => {
            validInput ? dispatchOnClick() : setRemind(!remind)
          }}
          value={'Join room'}
        />
      </form>
      {remind ? <MissingInput name={name} roomId={roomId} /> : null}
    </div>
  ) : (
    <Play />
  )
}
