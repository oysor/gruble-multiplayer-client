import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { Headline2, InfoText1 } from './styles'
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
    <div id="lobby" className="flex flex-col h-[100%] w-[100%]">
      <Stack_l className="text-center h-[6rem]">
        <Headline2>{roomName}</Headline2>
        <InfoText1 className="self-center text-center">
          {missingCategories
            ? 'Go back and choose some categores!'
            : 'Let the games begin!'}
        </InfoText1>
      </Stack_l>
      <Stack_l space="1em" justify="end" align="center" className="h-[100%]">
        <PlayerListBox playerList={playerList} />
      </Stack_l>
    </div>
  )
}
