import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'

interface TextBoxProps {
  children: JSX.Element | JSX.Element[]
}

const MessageBox = styled.div`
  display: block;
  outline: 0.125rem solid transparent;
  outline-offset: -0.125rem;
  background-color: white;
  color: #035151;

  border-radius: 0.2rem;


  /* max-height: 10rem; */
  min-height: 7rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding-left: 0.5em;
  padding-right: 0.5em;

  padding-bottom: 0.5em;
  padding-top: 0.5em;
`

const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;

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
