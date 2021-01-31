import React, { FunctionComponent } from 'react'

interface TimeProps {
  elapsedTime: number
}

export const Timer: FunctionComponent<TimeProps> = ({ elapsedTime }) => {
  return (
    <div className="timer">
      <h2>Time left: {elapsedTime} </h2>
    </div>
  )
}
