import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { Headline2, UnderHeadline } from './styles'
import { useAppSelector } from '../../hooks'
import { RoomState } from '../../store'

import { PlayerListBox } from '../../../common/components'
import { RoomIdCopyBox } from '../../components'

export const Lobby: FunctionComponent = () => {
  const { roomName, timeLimit, boardSettings, playerList } = useAppSelector(
    (state: RoomState) => state.room
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
        <RoomIdCopyBox />
      </div>
    </div>
  )
}
