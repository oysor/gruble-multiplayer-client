import React, { FunctionComponent } from 'react'
import { RoomCountDown } from '../../components/RoomCountDown'
import { TopLogo } from '../../../common/components/Logo'
import {
  Grid,
  Leftbar,
  Logo,
  Main,
  Navigation,
  Rightbar,
} from '../../../common/components'
import { RoomStatus } from '../../../common/constants'
import { useAppSelector } from '../../hooks'
import { RoomState } from '../../store'
import { CollectBoardLobby } from './CollectBoardLobby'

export const Playing: FunctionComponent = () => {
  const { roomStatus } = useAppSelector((state: RoomState) => state.room)

  return (
    <Grid>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <div className="flex justify-center">
          {roomStatus === RoomStatus.roundEnded ? (
            <CollectBoardLobby />
          ) : (
            <RoomCountDown />
          )}
        </div>
      </Main>
      <Leftbar></Leftbar>
      <Rightbar></Rightbar>
      <Navigation></Navigation>
    </Grid>
  )
}
