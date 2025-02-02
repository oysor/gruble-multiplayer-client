import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { useAppSelector } from '../../hooks'
import { RoomState } from '../../store'
import { Headline, InfoText1 } from '../../../common/components'
import { PlayerListBox } from '../../components/PlayerList/PlayerListBox'


export const Lobby: FunctionComponent = () => {
  const { roomName, timeLimit, boardSettings, playerList } = useAppSelector(
    (state: RoomState) => state.room
  )
  const { categories } = boardSettings

  const missingCategories = categories.length < 1

  const timeLimitInMinutes = timeLimit / 60

  const gameReady = !missingCategories && timeLimitInMinutes > 0

  return (
    <div id="lobby" className="flex flex-col h-[100%] w-[100%]">
      <Stack_l className="text-center h-[6rem]">
        <Headline>Lobby</Headline>
        <InfoText1 className="self-center text-center">
          {gameReady && 'Let the games begin!'}
          {missingCategories && 'Missing categories!'}
          {timeLimitInMinutes < 1 && 'Missing time limit!'}
        </InfoText1>
      </Stack_l>
      <Stack_l space="1em" justify="end" align="center" className="h-[100%]">
        <PlayerListBox playerList={playerList} />
      </Stack_l>
    </div>
  )
}
