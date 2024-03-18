import React from 'react'
import { useAppSelector } from '../../hooks'
import { CountDown } from '../../../common/components/timer'
import { PlayerState } from '../../store'

export const PlayerCountDown = () => {
  const { timeLimit, commonStates } = useAppSelector((state: PlayerState) => state.player)

  const { elapsedTime } = commonStates

  return <CountDown timeLeft={elapsedTime} timeLimit={timeLimit} />
}
