import React, { FunctionComponent, useState } from 'react'
import { RoomState } from '../store'
import { ChatBox, ConnectionStatus, PlayerListBox } from '../../common/components'
import { HandleAnswers, ShowResults, Playing, GameSettings } from '.'
import { useAppSelector } from '../hooks'
import { Box_l, Stack_l } from '../../common/everyLayout'
import { ConnectionMode } from '../../common/constants'
import { DisconnectOverlay } from '../../common/components/connection/Disconnected'

export const RoomPages: FunctionComponent = () => {
  const { commonStates, messages, currentPage, playerList } = useAppSelector(
    (state: RoomState) => state.room
  )
  const connected = commonStates.status === ConnectionMode.Connected


  const displayPage = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <GameSettings />
      case 2:
        return <Playing />
      case 3:
        return <HandleAnswers />
      case 4:
        return <ShowResults />
    }
  }

  return (
    <div
      id="roomPages"
      className="flex flex-col justify-center items-center min-h-[100vh] "
    >
      <div className="">
        {!connected ? <DisconnectOverlay status={commonStates.status} /> : null}
        <Stack_l>
          <ConnectionStatus status={commonStates.status} />

          {/* <Box_l padding="1rem" className="self-center">
            <img src={headline} alt="Logo" height="20px" />
          </Box_l> */}
        </Stack_l>
      </div>
      <div id="room-page" className="w-[100%] flex flex-1">
        {displayPage(currentPage)}
      </div>

      {/* {currentPage >= 3 ? (
        <div className="flex-1 flex">
          <Stack_l space="1rem" className="mt-[1rem]">
            <PlayerListBox playerList={playerList} />
            <ChatBox messages={messages} />
          </Stack_l>
        </div>
      ) : null} */}
    </div>
  )
}
