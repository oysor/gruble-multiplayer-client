import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../everyLayout'
import { Message, MessageItem } from '../../constants'
import { styled } from 'styled-components'
import { TextBox } from './TextBox'

type ChatBoxProps = {
  messages: MessageItem[]
}

interface PlayerRowProps {
  color?: string
}

export const PlayerRow = styled.span<PlayerRowProps>`
  color: ${(props) => props.color};
  font-size: 0.8em;
  word-break: break-all;
`

export const PlayerName = styled.span<PlayerRowProps>`
  color: ${(props) => props.color};
`
/*
    Lists all the player messages.
*/
export const ChatBox: FunctionComponent<ChatBoxProps> = ({ messages }) => {
  return (
    <Stack_l space="0.3rem" className="">
      <span>Messages</span>
      <TextBox>
        {messages.length > 0 ? (
          messages.map((message, i) => {
            const color = message?.color === 'undefined' ? 'grey' : message?.color
            const name = message?.name
            return (
              <PlayerRow key={i}>
                {name !== undefined ? (
                  <>
                    <PlayerName color={color ? color : 'gray'}>{name}</PlayerName>
                    <span className="text-slate-900">{': ' + message.message}</span>
                  </>
                ) : (
                  <span className="text-slate-900">{message.message}</span>
                )}
              </PlayerRow>
            )
          })
        ) : (
          <span className="text-slate-800">{'...'}</span>
        )}
      </TextBox>
    </Stack_l>
  )
}
