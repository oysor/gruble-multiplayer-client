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
  // Next page/component
  const [nextPage, setNext] = useState(false)
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const startGame = playerList.length > 0

  return !nextPage ? (
    <div className="room-start-game">
      <ShowRoomInput />
      <Button
        onClick={() => {
          if (startGame) {
            dispatch({ type: toServer.StartGame, payload: roomId })
            setNext(true)
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
