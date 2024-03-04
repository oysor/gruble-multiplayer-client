import React, { FunctionComponent, useState } from 'react'
import { RoomState } from '../../roomStore'
import { setNextPage, startGame } from '../../roomReducer'
import { Button, MissingInput } from '../../../../common/components'
import { ShowRoomInput } from '../../components'
import { useAppDispatch, useAppSelector } from '../../roomHooks'
import { Link, NavLink } from 'react-router-dom'

export const StartGame: FunctionComponent = () => {
  const { roomId, playerList } = useAppSelector((state: RoomState) => state.room)
  const dispatch = useAppDispatch()
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const gameStart = playerList.length > 0

  const dispatchOnClick = () => {
    console.log('PAYLOUD')
    console.log(roomId)
    dispatch(startGame({ roomId: roomId })), dispatch(setNextPage())
  }

  return (
    <div className="room-start-game">
      <ShowRoomInput />
      <Button
        onClick={() => {
          gameStart ? dispatchOnClick() : setReminder(!reminder)
        }}
      >
        Start Game
      </Button>
      {reminder ? <MissingInput playerList={playerList} /> : null}
      {/* <NavLink to={'/player'} target="_blank" rel="noopener noreferrer">
        Open new player tab
      </NavLink> */}
    </div>
  )
}
