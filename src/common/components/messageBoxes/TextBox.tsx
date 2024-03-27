import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'

interface TextBoxProps {
  children: JSX.Element | JSX.Element[]
}

const MessageBox = styled.div`
  display: block;
  outline: 0.125rem solid transparent;
  outline-offset: -0.125rem;
  background-color: #c4c4c4;
  border-radius: 0.2rem;

  max-width: 25rem;
  /* min-width: 10em; */

  padding-left: 0.5em;
  padding-right: 0.5em;
`

const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;

  /* max-height: 10rem;
  min-height: 2rem; */

  padding-top: 0.5em;
  padding-bottom: 0.5em;

  overflow-y: scroll;
  /* word-wrap: break-word; */

  word-break: break-all;

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
