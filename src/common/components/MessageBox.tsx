import React, { FunctionComponent } from 'react'

interface MessageBoxProps {
  messages: Array<string>
}
/*
    Lists all the messages received.
*/
export const MessageBox: FunctionComponent<MessageBoxProps> = ({ messages }) => {
  const listItems = messages.map((message, i) => <li key={i}>{message}</li>)

  return (
    <div className="message-box">
      <ul>{listItems}</ul>
      ...
    </div>
  )
}
