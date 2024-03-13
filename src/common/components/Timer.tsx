import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'

interface TimeProps {
  elapsedTime: number
}

interface TimeColorProps {
  color: string
}

export const Timer: FunctionComponent<TimeProps> = ({ elapsedTime }) => {
  return elapsedTime !== -99 ? (
    <div className="timer">
      <h2>Time left: {elapsedTime} </h2>
    </div>
  ) : null
}

const BaseTimer = styled.div`
  position: relative;
  height: 300px;
  width: 300px;
`

const BaseTimer_svg = styled.svg``

const BaseTimer_circle = styled.g`
  fill: none;
  stroke: none;
`

const BaseTimer_pathElapsed = styled.circle`
  stroke-width: 7px;
  stroke: grey;
`

const BaseTimer_label = styled.span`
  position: absolute;

  /* Size should match the parent container */
  width: 300px;
  height: 300px;

  /* Keep the label aligned to the top */
  top: 0;

  /* Create a flexible box that centers content vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Sort of an arbitrary number; adjust to your liking */
  font-size: 48px;
`

const BaseTimer_pathRemaining = styled.path<TimeColorProps>`
  /* Just as thick as the original ring */
  stroke-width: 7px;

  /* Rounds the line endings to create a seamless circle */
  stroke-linecap: round;

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;

  /* Allows the ring to change color when the color value updates */
  stroke: ${(props) => props.color};
`

const FULL_DASH_ARRAY = 283
// Warning occurs at 10s
const WARNING_THRESHOLD = 5
// Alert occurs at 5s
const ALERT_THRESHOLD = 2

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

  if (timeLeft === -99) {
    timeLeft = timeLimit
  }

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / timeLimit
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction)
  }

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
          ></BaseTimer_pathRemaining>
        </BaseTimer_circle>
      </BaseTimer_svg>
      <BaseTimer_label>{formatTimeLeft(timeLeft)}</BaseTimer_label>
    </BaseTimer>
  )
}
