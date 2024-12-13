import React, { FunctionComponent } from 'react'
import { PlayerState } from '../../store'
import { useAppSelector } from '../../hooks'
import { PlayerStatus } from '../../../common/constants'
import { TopLogo } from '../../../common/components/Logo'
import { PlayerResults } from './PlayerResults'
import { Waiting } from '../../../common/components/Waiting'
import {
  Grid2,
  Leftbar,
  Logo,
  Main,
  Navigation,
  Rightbar,
} from '../../../common/components'

export const Results: FunctionComponent = () => {
  const { playerStatus } = useAppSelector((state: PlayerState) => state.player)

  return (
    <Grid2>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <div className="flex justify-center">
          {playerStatus === PlayerStatus.receivedResult ? <PlayerResults /> : <Waiting />}
        </div>
      </Main>
      <Rightbar></Rightbar>
      <Leftbar></Leftbar>
      <Navigation></Navigation>
    </Grid2>
  )
}
