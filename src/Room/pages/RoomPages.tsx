import React, { FunctionComponent } from 'react'
import { RoomState } from '../store'
import { ConnectionStatus } from '../../common/components'
import { HandleAnswers, ShowResults, Playing, GameSettings } from '.'
import { useAppSelector } from '../hooks'
import { Stack_l } from '../../common/everyLayout'
import { ConnectionMode } from '../../common/constants'
import { DisconnectOverlay } from '../../common/components/connection/Disconnected'

export const RoomPages: FunctionComponent = () => {
  const { commonStates, currentPage } = useAppSelector((state: RoomState) => state.room)
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
      <div>
        {!connected ? <DisconnectOverlay status={commonStates.status} /> : null}
        <Stack_l>
          <ConnectionStatus status={commonStates.status} />
        </Stack_l>
      </div>
      <div id="room-page" className="w-[100%] flex flex-1">
        {displayPage(currentPage)}
      </div>
    </div>
  )
}
