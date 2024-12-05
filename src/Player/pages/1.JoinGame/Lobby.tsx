import React, { FunctionComponent, useState } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { PondrInput } from '../../../common/components/inputs/SmartInput'

import { Headline, InfoText1 } from './styles'
import { PlayerListBox } from '../../../common/components'
import { useAppSelector } from '../../hooks'
import { PlayerState } from '../../store'

interface Lobby {}

export const Lobby: FunctionComponent = () => {
  const { playerList } = useAppSelector((state: PlayerState) => state.player)

  return (
    <div className="flex justify-center">
      <div className="flex flex-col h-[100%] min-w-[10rem]">
        <Stack_l className="text-center h-[6rem]">
          <Headline>Lobby</Headline>
          <InfoText1 className="self-center text-center">
            Waiting for players, start game when all are ready.
          </InfoText1>
        </Stack_l>
        <div>
          <Stack_l space="1em" justify="center" align="center" className="h-[100%]">
            <PlayerListBox playerList={playerList} />
          </Stack_l>
        </div>
      </div>
    </div>
  )
}
