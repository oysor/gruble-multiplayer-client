import React, { FunctionComponent } from 'react'
import {
  BaseTimer,
  BaseTimer_circle,
  BaseTimer_label,
  BaseTimer_pathElapsed,
  BaseTimer_pathRemaining,
  BaseTimer_svg,
} from './styles'

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
    color: 'green',
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
      return 'Times up!'
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

    if (minutes === 0) {
      return outputSeconds
    }

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      outputSeconds = '0' + seconds.toString()
    }

    // The output in MM:SS format
    return `${minutes}:${outputSeconds}`
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

  return (
    <BaseTimer>
      <BaseTimer_svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <BaseTimer_circle className="base-timer__circle">
          <BaseTimer_pathElapsed cx="50" cy="50" r="45" />

          <BaseTimer_pathRemaining
            color={remainingPathColor}
            id="base-timer-path-remaining"
            strokeDasharray={circleDasharray}
            // className="base-timer__path-remaining ${remainingPathColor}"
            d=" 
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
          />
        </BaseTimer_circle>
      </BaseTimer_svg>
      <BaseTimer_label>{formatTimeLeft(timeLeft)}</BaseTimer_label>
    </BaseTimer>
  )
}
