import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../playerStore'

export const ShowPlayerInput: FunctionComponent = () => {
  const { playerName, roomId, boardSettings, playerBoard } = useSelector(
    (state: RootState) => state.player
  )

  return (
    <div className="show-player-input">
      Player name: {playerName}
      <br />
      Room Id: {roomId}
      <br />
      boardSettings: {JSON.stringify(boardSettings)}
      <br />
      playerBoard: {JSON.stringify(playerBoard)}
    </div>
  )
}
