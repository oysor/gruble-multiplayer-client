import React, { FunctionComponent } from 'react'
import { Box_l, Stack_l } from '../../everyLayout'

interface TextBoxProps {
  children: JSX.Element | JSX.Element[]
}
/*
    Styling of the message box
*/
export const TextBox: FunctionComponent<TextBoxProps> = ({ children }) => {
  return (
    <Box_l
      padding="1rem"
      backgroundColor="#c4c4c4"
      className="rounded-[0.2rem] max-w-[25rem]"
    >
      <Stack_l space="0.5rem" className="overflow-y-scroll max-h-[10rem]  break-words">
        {children}
      </Stack_l>
    </Box_l>
  )
}
