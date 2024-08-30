import React, { FunctionComponent } from 'react'
import { PlayerState } from '../../store'

import { useAppSelector } from '../../hooks'

import { FillPlayerBoard } from './FillPlayerBoard'
import { Introduction } from './Introduction'
import { PlayerStatus } from '../../../common/constants'
import { PlayerLobby } from './PlayerLobby'

export const Play: FunctionComponent = () => {
  const { playerStatus } = useAppSelector((state: PlayerState) => state.player)

  if (playerStatus === PlayerStatus.roundStarted) {
    return <FillPlayerBoard />
  }

  return <PlayerLobby />
}
