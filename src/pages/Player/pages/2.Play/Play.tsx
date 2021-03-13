import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerState } from '../../playerStore'
import { InputBoard } from './InputBoard'
import { SendMessage } from '../../components/SendMessage'
import { Results } from '../3.Results'

export const Play: FunctionComponent = () => {
  const { roomId, boardSettings, playerBoard, timesUp } = useSelector(
    (state: PlayerState) => state.player
  )
  const dispatch = useDispatch()
  // Next page/component
  const [nextPage, setNext] = useState(false)
  /**
   *  Go to next component when time is up
   */
  useEffect(() => {
    if (timesUp === true) {
      dispatch({
        type: 'player/sendBoard',
        payload: { roomId: roomId, board: playerBoard },
      })
      setNext(true)
    }
  }, [timesUp, dispatch, roomId, playerBoard])

  return !nextPage ? (
    <div className="play">
      <SendMessage roomId={roomId} />
      <InputBoard board={playerBoard} boardSettings={boardSettings} />
    </div>
  ) : (
    <Results />
  )
}
