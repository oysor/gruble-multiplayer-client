import React from 'react'
import { useAppSelector } from '../hooks'
import { RoomState } from '../store'
import { CountDown } from '../../common/components/timer'

export const RoomCountDown = () => {
  const { timeLimit, commonStates } = useAppSelector((state: RoomState) => state.room)

  const { elapsedTime } = commonStates

  return <CountDown timeLeft={elapsedTime} timeLimit={timeLimit} />
}
