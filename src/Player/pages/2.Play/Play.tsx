import React, { FunctionComponent } from 'react'
import {
  Grid,
  Leftbar,
  Logo,
  Main,
  Navigation,
  Rightbar,
} from '../../../Room/pages/1.GameSettings/styles'

import { TopLogo } from '../../../common/components/Logo'
import { FillPlayerBoard } from './FillPlayerBoard'
import { PlayerCountDown } from '../../components/PlayerCountDown'

export const Play: FunctionComponent = () => {
  return (
    <Grid>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <div className="flex justify-center">
          <FillPlayerBoard />
        </div>
      </Main>
      <Leftbar>
        <PlayerCountDown />
      </Leftbar>
      <Rightbar></Rightbar>
      <Navigation></Navigation>
    </Grid>
  )
}
