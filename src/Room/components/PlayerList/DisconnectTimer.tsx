import React, { FunctionComponent } from 'react'
import { useTimer } from 'react-timer-hook'
import { useAppDispatch } from '../../hooks'
import { playerDropout, removePlayer } from '../../reducer'
import { Player } from '../../../common/constants'
import { styled } from 'styled-components'

const StyledTimer = styled.div`
  display: flex;
  opacity: 0.5;
`
const StyledButton = styled.button`
  padding: 0.25em;
  background-color: transparent;
  color: white;
  font-weight: bold;
`

type MyTimerProps = {
  expiryTimestamp: Date
  player: Player
}

export const DisconnectTimer: FunctionComponent<MyTimerProps> = ({
  expiryTimestamp,
  player,
}) => {
  const {
    // totalSeconds,
    seconds,
    // minutes,
    // hours,
    // days,
    // isRunning,
    // start,
    // pause,
    // resume,
    // restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.warn('onExpire called')
      dropPlayer()
    },
    autoStart: true,
  })

  const dispatch = useAppDispatch()

  const dropPlayer = () => {
    dispatch(playerDropout({ userId: player.userId }))
  }

  const kickPlayer = () => {
    dispatch(removePlayer({ userId: player.userId }))
  }

  const timesUp = seconds === 0

  return (
    <StyledTimer>
      {/* <h1>react-timer-hook </h1>
      <p>Timer Demo</p> */}
      {/* <div style={{ fontSize: '1em' }}> */}
      {/* <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>: */}
      {/* <span>{seconds}</span> */}
      {timesUp ? (
        <StyledButton onClick={kickPlayer}>Kick</StyledButton>
      ) : (
        <span>{seconds}</span>
      )}
      {/* </div> */}
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button> */}

      {/* <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date()
          time.setSeconds(time.getSeconds() + 10)
          restart(time)
        }}
      >
        Restart
      </button> */}
    </StyledTimer>
  )
}
