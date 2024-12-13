import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'

interface TimeProps {
  elapsedTime: number
}

export const Timer: FunctionComponent<TimeProps> = ({ elapsedTime }) => {
  return elapsedTime !== -99 ? (
    <div className="timer">
      <h2>Time left: {elapsedTime} </h2>
    </div>
  ) : null
}

const FULL_DASH_ARRAY = 283
// Warning occurs at 10s
const WARNING_THRESHOLD = 30
// Alert occurs at 5s
const ALERT_THRESHOLD = 10

const COLOR_CODES = {
  info: {
    color: 'white',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
}

interface CountDownProps {
  timeLeft: number
  timeLimit: number
}

export const CountDown: FunctionComponent<CountDownProps> = ({ timeLeft, timeLimit }) => {
  const { alert, warning, info } = COLOR_CODES

  const formatTimeLeft = (time: number) => {
    if (timeLeft === 0) {
      // return 'Times up!'
      return ''

    }

    if (time === -99) {
      return ''
    }
    if (time === undefined || typeof time !== 'number') {
      return 'Error'
    }

    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60)

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    const seconds = time % 60
    let outputSeconds = seconds.toString()
    let outputMinutes = seconds.toString()

    if (minutes === 0) {
      return outputSeconds
    }

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      outputSeconds = '0' + seconds.toString()
    }

    if (minutes < 10) {
      outputMinutes = '0' + minutes.toString()
    }

    // The output in MM:SS format
    return `${outputMinutes}:${outputSeconds}`
  }

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / timeLimit
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction)
  }

  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`

  let remainingPathColor = info.color

  if (timeLeft <= alert.threshold) {
    remainingPathColor = alert.color
  } else if (timeLeft <= warning.threshold) {
    remainingPathColor = warning.color
  }

  const CenterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `

  const TimerBox = styled.div`
    height: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `
  const AboveTimerText = styled.div`
    color: #069e9e;
    font-size: 1rem;
    font-family: Inter;
  `

  interface TimeColorProps {
    color: string
  }

  const TimerCount = styled.div<TimeColorProps>`
    font-size: 4rem;
    letter-spacing: 2px;
    color: ${(props) => props.color};
    font-family: 'Inter', sans-serif;
    font-optical-sizing: auto;
    /* font-weight: 500; */
    font-style: normal;
  `

  return (
    <CenterBox>
      <TimerBox>
        <AboveTimerText>Time left</AboveTimerText>
        <TimerCount color={remainingPathColor}>{formatTimeLeft(timeLeft)}</TimerCount>
      </TimerBox>
    </CenterBox>
  )
}
