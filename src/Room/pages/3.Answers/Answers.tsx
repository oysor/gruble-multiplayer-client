import React, { FunctionComponent } from 'react'
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

export const Answers: FunctionComponent = () => {
  return (
    <Grid>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <div className="flex justify-center">
          <HandleAnswers />
        </div>
      </Main>
      <Leftbar></Leftbar>
      <Rightbar></Rightbar>
      <Navigation></Navigation>
    </Grid>
  )
}
