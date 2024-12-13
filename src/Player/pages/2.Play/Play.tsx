import React, { FunctionComponent } from 'react'
import { TopLogo } from '../../../common/components/Logo'
import { FillPlayerBoard } from './FillPlayerBoard'
import { PlayerCountDown } from '../../components/PlayerCountDown'
import { useAppSelector } from '../../hooks'
import { PlayerState } from '../../store'
import { styled } from 'styled-components'
import { Stack_l } from '../../../common/everyLayout'
import {
  Grid2,
  Leftbar,
  Logo,
  Main,
  Navigation,
  Rightbar,
} from '../../../common/components'

const AboveTimerText = styled.div`
  font-family: Inter;
  color: #069e9e;
  font-size: 1rem;
`
const StatsText = styled.span`
  font-family: Inter;
  font-size: 1.5rem;
  font-weight: 500;
`

export const Play: FunctionComponent = () => {
  const { playerBoard } = useAppSelector((state: PlayerState) => state.player)

  const nFilledOut = playerBoard.reduce((acc, row) => acc + row.filter(Boolean).length, 0)
  const nSquares = playerBoard.length * playerBoard[0].length
  const stats = nFilledOut + '/' + nSquares
  console.log(nFilledOut + '/' + nSquares)

  return (
    <Grid2>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <FillPlayerBoard />
      </Main>
      <Rightbar>
        <Stack_l space="0.5rem" align="center">
          <AboveTimerText>Answers</AboveTimerText>
          <StatsText>{stats}</StatsText>
        </Stack_l>
      </Rightbar>
      <Leftbar>
        <PlayerCountDown />
      </Leftbar>
      <Navigation></Navigation>
    </Grid2>
  )
}
