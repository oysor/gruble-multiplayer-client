import React, { FunctionComponent, useEffect } from 'react'
import { PlayerState } from '../../store'

import { sendBoard, setNextPage } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { Playing } from './Playing'
import { Introduction } from './Introduction'

export const Play: FunctionComponent = () => {
  const { roomId, playerBoard, commonStates, timesUp } = useAppSelector(
    (state: PlayerState) => state.player
  )
  const dispatch = useAppDispatch()

  /**
   *  Go to next component when time is up
   */
  useEffect(() => {
    if (timesUp === true) {
      dispatch(sendBoard({ roomId: roomId, board: playerBoard }))
      dispatch(setNextPage())
    }
  }, [timesUp, dispatch, roomId, playerBoard])

  if (!commonStates.roundIsOn) {
    return <Introduction />
  }

  return <Playing />
}
