import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../playerStore'
import { InputBoard } from './components/InputBoard'
import { SendMessage } from '../../components/SendMessage'

export const Play: FunctionComponent = () => {
  const { roomId, boardSettings, playerBoard, gameFinished } = useSelector(
    (state: RootState) => state.player
  )
  const dispatch = useDispatch()

  if (gameFinished === true) {
    dispatch({
      type: 'player/sendBoard',
      payload: { roomId: roomId, board: playerBoard },
    })
  }

  return (
    <div className="play">
      <SendMessage roomId={roomId} />
      <InputBoard board={playerBoard} boardSettings={boardSettings} />
    </div>
  )
}
