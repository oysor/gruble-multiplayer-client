import React from 'react'
import { useAppSelector } from '../hooks'
import { CountDown } from '../../common/components/timer'
import { PlayerState } from '../store'

export const PlayerCountDown = () => {
  const { timeLimit, commonStates } = useAppSelector((state: PlayerState) => state.player)

  const { elapsedTime } = commonStates

  let timeLeft

  if (elapsedTime === -99) {
    timeLeft = timeLimit
  } else if (elapsedTime >= timeLimit) {
    timeLeft = 0
  } else {
    timeLeft = timeLimit - elapsedTime
  }

  return <CountDown timeLeft={timeLeft} timeLimit={timeLimit} />
}
