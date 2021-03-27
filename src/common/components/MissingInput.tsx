import React, { FunctionComponent } from 'react'
import { Player } from '../constants'
import { isUndefined } from '../typeGuards'

interface MissingInputProps {
  name?: string
  roomId?: string
  timeLimit?: number
  categoryList?: string[]
  playerList?: Player[]
}

export const MissingInput: FunctionComponent<MissingInputProps> = ({
  name,
  roomId,
  timeLimit,
  categoryList,
  playerList,
}) => {
  const reminders = []

  if (!isUndefined(name) && name.length === 0) {
    reminders.push(<span key={1}>You must input player name.</span>)
  }
  if (!isUndefined(roomId) && roomId.length === 0) {
    reminders.push(<span key={2}>You must input room name.</span>)
  }
  if (!isUndefined(timeLimit) && timeLimit <= 0) {
    reminders.push(<span key={3}>You must input time limit.</span>)
  }
  if (!isUndefined(categoryList) && categoryList[0].length === 0) {
    reminders.push(<span key={4}>You must input at least one category.</span>)
  }
  if (!isUndefined(playerList) && playerList.length === 0) {
    reminders.push(
      <span key={5}>At least one player must join the game before you can start.</span>
    )
  }
  return (
    <div className="reminder">
      {reminders.map((r, i) => {
        return <div key={i}>{r}</div>
      })}
    </div>
  )
}
