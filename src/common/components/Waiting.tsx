import React, { FunctionComponent } from 'react'
import { Stack_l } from '../everyLayout'
import Maskot2 from '../../assets/svg/Brainy_thumbs_up.svg'
import { styled } from 'styled-components'

export const Headline = styled.div`
  font-family: var(--font-medium);
  font-size: 2em;
`

interface Waiting {
  msg?: string
}

export const Waiting: FunctionComponent<Waiting> = ({ msg }) => {
  return (
    <div className="flex flex-col h-[100%]">
      <Stack_l className="text-center h-[6rem] mt-[4rem]">
        <Headline>{msg}</Headline>
      </Stack_l>
      <div className="flex-1 flex items-center justify-center">
        <Maskot2 maxwidth="100%" height="10rem" />
      </div>
    </div>
  )
}
