import React, { FunctionComponent } from 'react'
import { Message } from '../constants'

interface PlayerMessageBoxProps {
  playerMessages: Message[]
}
/*
    Lists all the messages received from players.
*/
export const PlayerMessageBox: FunctionComponent<PlayerMessageBoxProps> = ({
  playerMessages,
}) => {
  const listItems = playerMessages.map((m, i) => {
    return (
      <li key={i}>
        <span
          className="message-item"
          style={{ boxShadow: '0px 0px 3px' + m.player.color }}
        >
          {m.message}
        </span>
      </li>
    )
  })

  return listItems.length > 0 ? (
    <div className="message-box">
      <ul>{listItems}</ul>
    </div>
  ) : null
}
