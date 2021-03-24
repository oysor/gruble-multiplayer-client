import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerState } from '../../playerStore'
import { InputBoard } from './InputBoard'
import { setNextPage } from '../../playerReducer'
import { Timer } from '../../../../common/components'

export const Play: FunctionComponent = () => {
  const { roomId, boardSettings, playerBoard, timesUp, commonStates } = useSelector(
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

  const gameIsOn = commonStates.elapsedTime > 0

  return (
    <div className="play">
      <Timer elapsedTime={commonStates.elapsedTime}></Timer>
      {gameIsOn ? (
        <InputBoard board={playerBoard} boardSettings={boardSettings} />
      ) : (
        <h2>Waiting for players...</h2>
      )}
    </div>
  )
}
