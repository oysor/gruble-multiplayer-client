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

export const Playing: FunctionComponent = () => {
  return (
    <Grid>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <div className="flex justify-center">
          <RoomCountDown />
        </div>
      </Main>
      <Leftbar></Leftbar>
      <Rightbar></Rightbar>
      <Navigation></Navigation>
    </Grid>
  )
}
