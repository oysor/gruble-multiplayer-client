import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { useAppSelector } from '../../hooks'

import { PlayerListBox } from '../../../common/components'
import { PlayerState } from '../../store'

import { styled } from 'styled-components'
import { SettingsInfo } from '../../../common/components/SettingsInfo'
import { CopyIdBox } from '../../components/CopyIdBox'

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
  const { roomName, roomId, timeLimit, boardSettings, playerList } = useAppSelector(
    (state: PlayerState) => state.player
  )

  return (
    <div className="flex flex-col h-[100%] min-w-[10rem]">
      <Stack_l className="text-center h-[6rem]">
        <Headline2>{roomName}</Headline2>
        <UnderHeadline className="self-center text-center">
        Waiting for players, start game when all are ready.
        </UnderHeadline>
      </Stack_l>
      <div>
      <Stack_l space="1em" justify="center" align="center" className="h-[100%]">
        <PlayerListBox playerList={playerList} />
        <SettingsInfo timeLimit={timeLimit} boardSettings={boardSettings} />
        <CopyIdBox roomId={roomId}/>
      </Stack_l>
      </div>
    </div>
  )
}
