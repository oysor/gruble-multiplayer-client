import React, { FunctionComponent } from 'react'
import { RoomState } from '../store'
import {
  ChatBox,
  ConnectionStatus,
  MessageBox,
  PlayerListBox,
} from '../../common/components'
import { PrepareBoard, StartGame, HandleAnswers, ShowResults } from '.'
import { useAppSelector } from '../hooks'
import { PrepareRoom } from './1.PrepareRoom'
import { Center_l, Cover_l, Stack_l } from '../../common/everyLayout'
import { ConnectionMode } from '../../common/constants'
import { DisconnectedCover } from '../../common/components/connection/Disconnected'

export const RoomPages: FunctionComponent = () => {
  const { commonStates, messages, currentPage, playerMessages, playerList } =
    useAppSelector((state: RoomState) => state.room)
  const connected = commonStates.status === ConnectionMode.Connected

  const displayPage = (currentPage: number) => {
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
      {!connected ? <DisconnectedCover status={commonStates.status} /> : null}
      <Center_l intrinsic>
        <ConnectionStatus status={commonStates.status} />
        <Center_l>{displayPage(currentPage)}</Center_l>
        {currentPage >= 3 ? (
          <Stack_l space="1rem" className="mt-[1rem]">
            <MessageBox messages={messages} />
            {/* <PlayerListBox playerList={playerList} /> */}
            <ChatBox messages={playerMessages} />
          </Stack_l>
        ) : null}
      </Center_l>
    </Cover_l>
  )
}
