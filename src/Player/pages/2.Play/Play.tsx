import React, { FunctionComponent } from 'react'
import { PlayerState } from '../../store'

import { useAppSelector } from '../../hooks'

import { Playing } from './Playing'
import { Introduction } from './Introduction'
import { PlayerStatus } from '../../../common/constants'

export const Play: FunctionComponent = () => {
  const { playerStatus } = useAppSelector((state: PlayerState) => state.player)

  if (playerStatus == PlayerStatus.receivedRoom) {
    return <Introduction />
  }

  return <Playing />
}
