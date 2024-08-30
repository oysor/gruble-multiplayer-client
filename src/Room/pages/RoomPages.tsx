import React, { FunctionComponent } from 'react'
import { RoomState } from '../store'
import { ChatBox, ConnectionStatus, PlayerListBox } from '../../common/components'
import { HandleAnswers, ShowResults, Playing, GameSettings, CreateRoom } from '.'
import { useAppSelector } from '../hooks'
import { Box_l, Stack_l } from '../../common/everyLayout'
import { ConnectionMode } from '../../common/constants'
import { DisconnectOverlay } from '../../common/components/connection/Disconnected'

import headline from '../../assets/images/pondr.png'

export const RoomPages: FunctionComponent = () => {
  const { commonStates, messages, currentPage, playerList } = useAppSelector(
    (state: RoomState) => state.room
  )
  const connected = commonStates.status === ConnectionMode.Connected


  const displayPage = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <CreateRoom />
      case 2:
        return <GameSettings />
      case 3:
        return <Playing />
      case 4:
        return <HandleAnswers />
      case 5:
        return <ShowResults />
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <div className="">
        {!connected ? <DisconnectOverlay status={commonStates.status} /> : null}
        <Stack_l>
          <ConnectionStatus status={commonStates.status} />

          <Box_l padding="1rem" className="self-center">
            <img src={headline} alt="Logo" height="20px" />
          </Box_l>
        </Stack_l>
      </div>
      <div className="flex-1 flex ">{displayPage(currentPage)}</div>
      {currentPage >= 3 ? (
        <div className="flex-1 flex">
          <Stack_l space="1rem" className="mt-[1rem]">
            <PlayerListBox playerList={playerList} />
            <ChatBox messages={messages} />
          </Stack_l>
        </div>
      ) : null}
    </div>
  )
}
