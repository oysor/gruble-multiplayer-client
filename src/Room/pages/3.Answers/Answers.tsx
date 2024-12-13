import React, { FunctionComponent } from 'react'
import { RoomState } from '../../store'
import { useAppSelector } from '../../hooks'
import { RoomStatus } from '../../../common/constants'
import { Waiting } from '../../../common/components/Waiting'
import { HandleAnswers } from './HandleAnswers'
import { TopLogo } from '../../../common/components/Logo'
import {
  Grid,
  Leftbar,
  Logo,
  Main,
  Navigation,
  Rightbar,
} from '../../../common/components'
import { PlayerResults } from '../../components/PlayerResult'

export const Answers: FunctionComponent = () => {
  const { roomStatus } = useAppSelector((state: RoomState) => state.room)

  return (
    <Grid>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <div className="flex justify-center">
          {roomStatus === RoomStatus.boardsReceived ? <HandleAnswers /> : <Waiting />}
        </div>
      </Main>
      <Leftbar></Leftbar>
      <Rightbar></Rightbar>
      <Navigation></Navigation>
    </Grid>
  )
}
