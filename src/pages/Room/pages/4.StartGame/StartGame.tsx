import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, MissingInput } from '../../../../common/components'
import { RoomState } from '../../roomStore'
import { setNextPage, toServer } from '../../roomReducer'
import { ShowRoomInput } from '../../components'

export const StartGame: FunctionComponent = () => {
  const { roomId, playerList } = useSelector((state: RoomState) => state.room)
  const dispatch = useDispatch()
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const startGame = playerList.length > 0

  const dispatchOnClick = () => {
    dispatch({ type: toServer.StartGame, payload: roomId })
    dispatch(setNextPage())
  }

  return (
    <div className="room-start-game">
      <ShowRoomInput />
      <Button
        onClick={() => {
          startGame ? dispatchOnClick() : setReminder(!reminder)
        }}
      >
        Start Game
      </Button>
      {reminder ? <MissingInput playerList={playerList} /> : null}
    </div>
  )
}
