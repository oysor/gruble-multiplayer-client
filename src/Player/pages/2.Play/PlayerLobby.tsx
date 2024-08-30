import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { useAppSelector } from '../../hooks'

import { PlayerListBox } from '../../../common/components'
import { PlayerState } from '../../store'


import { styled } from 'styled-components'

export const Headline = styled.div`
  font-family: var(--font-medium);
  font-size: 2em;
`
export const Headline2 = styled.div`
  font-family: var(--font-medium);
  font-size: 2.4em;
`

export const UnderHeadline = styled.div`
  font-family: var(--font-regular);
  font-size: 1em;
`


export const PlayerLobby: FunctionComponent = () => {
  const { timeLimit, boardSettings, playerList } = useAppSelector(
    (state: PlayerState) => state.player
  )
  const { categories } = boardSettings

  const missingCategories = categories.length < 1

  const timeLimitInMinutes = timeLimit / 60

  return (
    <div className="flex flex-col h-[100%]">
      <Stack_l className="text-center h-[6rem]">
        <Headline2>Lobby</Headline2>
        <UnderHeadline className="self-center text-center">
          {missingCategories
            ? 'Go back and choose some categores!'
            : 'Let the games begin!'}
        </UnderHeadline>
      </Stack_l>
      <Stack_l space="1em" justify="center" align="center" className="h-[100%]">
        <PlayerListBox playerList={playerList} />
        <Stack_l space="1em" className="max-w-[13em]">
          <UnderHeadline className="self-center text-center">
            {timeLimitInMinutes + ' minutes'}
          </UnderHeadline>
          <UnderHeadline className="self-center text-center">
            {categories.join(', ')}
          </UnderHeadline>
        </Stack_l>
      </Stack_l>
      <div className="self-center">
        {/* <RoomIdCopyBox /> */}
      </div>
    </div>
  )
}
