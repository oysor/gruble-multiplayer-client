import React, { FunctionComponent } from 'react'

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
