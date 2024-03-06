import React, { FunctionComponent } from 'react'
import { RoomState } from '../store'
import {
  ConnectionStatus,
  MessageBox,
  PlayerList,
  PlayerMessageBox,
} from '../../common/components'
import { PrepareBoard, StartGame, HandleAnswers, ShowResults } from '.'
import { useAppSelector } from '../hooks'
import { PrepareRoom } from './1.PrepareRoom'
import { Box_l, Center_l, Cover_l } from '../../common/everyLayout'

export const RoomPages: FunctionComponent = () => {
  const { commonStates, messages, currentPage, playerMessages, playerList } =
    useAppSelector((state: RoomState) => state.room)

  const showComponent = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <PrepareRoom />
      case 2:
        return <PrepareBoard />
      case 3:
        return <StartGame />
      case 4:
        return <HandleAnswers />
      case 5:
        return <ShowResults />
    }
  }

  return (
    <Cover_l centered="div">
      <Center_l>
        <ConnectionStatus status={commonStates.status} />

        <Center_l>{showComponent(currentPage)}</Center_l>

        <PlayerList playerList={playerList} />
        {/* <Box_l>
          <MessageBox messages={messages} />
          <PlayerMessageBox playerMessages={playerMessages} />
        </Box_l> */}
      </Center_l>
    </Cover_l>
  )
}
