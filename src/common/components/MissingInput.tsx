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
    reminders.push(<div key={1}>You must input player name.</div>)
  }
  if (!isUndefined(roomId) && roomId.length === 0) {
    reminders.push(<div key={2}>You must input room name.</div>)
  }
  if (!isUndefined(timeLimit) && timeLimit <= 0) {
    reminders.push(<div key={3}>You must input time limit.</div>)
  }
  if (!isUndefined(categoryList) && categoryList[0].length === 0) {
    reminders.push(<div key={4}>You must input at least one category.</div>)
  }
  if (!isUndefined(playerList) && playerList.length === 0) {
    reminders.push(
      <div key={5}>At least one player must join the game before you can start.</div>
    )
  }
  return <div>{reminders}</div>
}
