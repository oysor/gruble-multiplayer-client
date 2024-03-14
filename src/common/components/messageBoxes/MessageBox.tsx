import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../everyLayout'
import { TextBox } from './TextBox'

interface MessageBoxProps {
  messages: Array<string>
}
/*
    Lists all the server messages received.
*/
export const MessageBox: FunctionComponent<MessageBoxProps> = ({ messages }) => {
  return (
    <Stack_l space="0.3rem">
      <span>Messages</span>
      <TextBox>
        {messages.length > 0 ? (
          messages.map((message, i) => {
            return (
              <span key={i} className="text-slate-800">
                {message}
              </span>
            )
          })
        ) : (
          <span className="text-slate-800">{'Waiting for someone to join...'}</span>
        )}
      </TextBox>
    </Stack_l>
  )
}
