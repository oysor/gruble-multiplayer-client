import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, MissingInput } from '../../../../common/components'
import { RoomState } from '../../roomStore'
import { toServer } from '../../roomReducer'
import { ShowRoomInput } from '../../components'
import { HandleResults } from '../6.HandleResults'

export const StartGame: FunctionComponent = () => {
  const { roomId, playerList } = useSelector((state: RoomState) => state.room)
  const dispatch = useDispatch()

  const startGame = playerList.length > 0
  const [reminder, setReminder] = useState(false)

  // Next component
  const [nextPage, setNext] = useState(true)

  return nextPage ? (
    <div className="room-start-game">
      <ShowRoomInput />
      <Button
        onClick={() => {
          if (startGame) {
            dispatch({ type: toServer.StartGame, payload: roomId })
            setNext(false)
          } else {
            setReminder(!reminder)
          }
        }}
      >
        Start Game
      </Button>
      {reminder ? <MissingInput playerList={playerList} /> : null}
    </div>
  ) : (
    <HandleResults />
  )
}
