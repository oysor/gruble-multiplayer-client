import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerState } from '../../playerStore'
import { InputBoard } from './InputBoard'
import { setNextPage } from '../../playerReducer'

export const Play: FunctionComponent = () => {
  const { roomId, boardSettings, playerBoard, timesUp } = useSelector(
    (state: PlayerState) => state.player
  )
  const dispatch = useDispatch()
  /**
   *  Go to next component when time is up
   */
  useEffect(() => {
    if (timesUp === true) {
      dispatch({
        type: 'player/sendBoard',
        payload: { roomId: roomId, board: playerBoard },
      })
      dispatch(setNextPage())
    }
  }, [timesUp, dispatch, roomId, playerBoard])

  return (
    <div className="play">
      <InputBoard board={playerBoard} boardSettings={boardSettings} />
    </div>
  )
}
