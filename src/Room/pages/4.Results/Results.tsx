import React, { FunctionComponent } from 'react'
import { RoomState } from '../../store'
import { useAppSelector } from '../../hooks'
import { Box_l, Stack_l } from '../../../common/everyLayout'
import { Table } from '../../../common/components/tables'
import { PlayerResultBoards } from '../../../common/components/boards'
import {
  Grid,
  Leftbar,
  Logo,
  Main,
  Navigation,
  Rightbar,
} from '../../../common/components/Grid'
import { TopLogo } from '../../../common/components/Logo'

export const Results: FunctionComponent = () => {
  const { playerList, boardDictionary, boardSettings } = useAppSelector(
    (state: RoomState) => state.room
  )
  const playerStats = playerList.map((p) => {
    return { player: p.name, ...p.playerResult }
  })

  const winner = playerStats.reduce(function (prev, current) {
    return prev && prev.score > current.score ? prev : current
  })

  return (
    <Grid>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <div className="flex justify-center">
          <Box_l>
            <Stack_l space="2.5rem">
              <Table playerStats={playerStats} />
              <div>
                {winner.player} won with {winner.score} points
              </div>
              <PlayerResultBoards
                playerList={playerList}
                boardDictionary={boardDictionary}
                boardSettings={boardSettings}
              />
            </Stack_l>
          </Box_l>
        </div>
      </Main>
      <Leftbar></Leftbar>
      <Rightbar></Rightbar>
      <Navigation></Navigation>
    </Grid>
  )
}
