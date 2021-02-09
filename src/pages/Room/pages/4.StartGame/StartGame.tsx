import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, MissingInput } from '../../../../common/components'
import { RoomState } from '../../roomStore'
import { toServer } from '../../roomReducer'
import { ShowRoomInput } from '../../components'

export const StartGame: FunctionComponent = () => {
  const { roomId, playerList } = useSelector((state: RoomState) => state.room)
  const dispatch = useDispatch()

  const startGame = playerList.length > 0
  const [reminder, setReminder] = useState(false)

  return (
    <div className="room-start-game">
      <ShowRoomInput />
      <Button
        onClick={() => {
          startGame
            ? dispatch({ type: toServer.StartGame, payload: roomId })
            : setReminder(!reminder)
        }}
      >
        Start Game
      </Button>
      {reminder ? <MissingInput playerList={playerList} /> : null}
    </div>
  )
}
