import React, { FunctionComponent } from 'react'

interface MessageBoxProps {
  messages: Array<string>
}
/*
    Lists all the messages received.
*/
export const MessageBox: FunctionComponent<MessageBoxProps> = ({ messages }) => {
  const listItems = messages.map((message, i) => (
    <li className="message-item" key={i}>
      {message}
    </li>
  ))

  return listItems.length > 0 ? (
    <div className="message-box">
      <ul>{listItems}</ul>
    </div>
  ) : null
}
