import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../everyLayout'
import { Message } from '../../constants'
import { styled } from 'styled-components'
import { TextBox } from './TextBox'

type ChatBoxProps = {
  messages: Message[]
}

interface PlayerRowProps {
  color?: string
}

export const PlayerRow = styled.span<PlayerRowProps>`
  color: ${(props) => props.color};
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
      <span>Player chat</span>
      <TextBox>
        {messages.length > 0 ? (
          messages
            .map((message, i) => {
              return (
                // <PlayerRow key={i} color={message.player.color}>
                //   {message.message}
                // </PlayerRow>

                <div key={i}>
                  <PlayerName color={message.player.color}>
                    {message.player.name + ': '}
                  </PlayerName>
                  <span className="text-slate-900">{message.message}</span>
                </div>
              )
            })
            .reverse()
        ) : (
          <span className="text-slate-800">{'...'}</span>
        )}
      </TextBox>
    </Stack_l>
  )
}
