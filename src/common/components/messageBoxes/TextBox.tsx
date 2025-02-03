import React, { FunctionComponent } from 'react'
import { css, styled } from 'styled-components'

interface TextBoxProps {
  children: JSX.Element | JSX.Element[]
}

type MessagesProps = {
  fullWidth?: boolean
}

export const MessageBox = styled.div`
  display: block;
  outline: 0.125rem solid transparent;
  outline-offset: -0.125rem;
  background-color: rgba(225, 225, 225, 0.2);

  border-radius: 0.2rem;

  min-height: 7rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding-left: 0.5em;
  padding-right: 0.5em;

  padding-bottom: 0.5em;
  padding-top: 0.5em;
`

export const Messages = styled.div<MessagesProps>`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;

  padding-top: 0.5em;
  padding-bottom: 0.5em;

  overflow-y: scroll;

  word-break: break-all;

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  & > * + * {
    margin-bottom: 0.4em;
  }
`

/*
    Styling of the message box
*/
export const TextBox: FunctionComponent<TextBoxProps> = ({ children }) => {
  return (
    <MessageBox>
      <Messages>{children}</Messages>
    </MessageBox>
  )
}
