import React, { FunctionComponent } from 'react'
import { Player } from '../constants'
import { isUndefined } from '../typeGuards'

interface MissingInputProps {
  name?: string
  roomId?: string
  timeLimit?: number
  categoryList?: string[]
  missingBaordInput?: boolean
  letterList?: string[]
  playerList?: Player[]
}

export const MissingInput: FunctionComponent<MissingInputProps> = ({
  name,
  roomId,
  timeLimit,
  categoryList,
  letterList,
  playerList,
  missingBaordInput,
}) => {
  const reminders = []

  if (!isUndefined(name) && name.length === 0) {
    reminders.push(<span key={1}>You must input a player name.</span>)
  }
  if (!isUndefined(roomId) && roomId.length === 0) {
    reminders.push(<span key={2}>You must input room name.</span>)
  }
  if (!isUndefined(timeLimit) && timeLimit <= 0) {
    reminders.push(<span key={3}>You must input time limit.</span>)
  }
  if (!isUndefined(categoryList)) {
    reminders.push(<span key={4}>Missing category field</span>)
  }
  if (!isUndefined(letterList)) {
    reminders.push(<span key={4}>Missing letter field</span>)
  }
  if (!isUndefined(missingBaordInput)) {
    reminders.push(<span key={4}>Board contains an empty field</span>)
  }
  if (!isUndefined(playerList) && playerList.length === 0) {
    reminders.push(<span key={5}>At least one player must join the game.</span>)
  }
  return (
    <div className="reminder">
      {reminders.map((r, i) => {
        return <div key={i}>{r}</div>
      })}
    </div>
  )
}
