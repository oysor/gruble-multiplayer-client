import React, { FunctionComponent } from 'react'
import { PlayerState } from '../store'
import { ConnectionStatus } from '../../common/components'
import { useAppSelector } from '../hooks'
import { Stack_l } from '../../common/everyLayout'
import { JoinGame } from './1.JoinGame'
import { Play } from './2.Play'
import { Results } from './3.Results'
import { DisconnectOverlay } from '../../common/components/connection/Disconnected'
import { ConnectionMode } from '../../common/constants'
import { GameClosed } from '../../common/components/connection'

export const PlayerPages: FunctionComponent = () => {
  const { commonStates, currentPage, gameClosed } = useAppSelector(
    (state: PlayerState) => state.player
  )
  const connected = commonStates.status === ConnectionMode.Connected

  const displayPage = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <JoinGame />
      case 2:
        return <Play />
      case 3:
        return <Results />
    }
  }

  return (
    <div
      id="playerPages"
      className="flex flex-col justify-center items-center min-h-[100vh] "
    >
      <div>
        {!connected ? <DisconnectOverlay status={commonStates.status} /> : null}
        {gameClosed ? <GameClosed /> : null}
        <Stack_l>
          <ConnectionStatus status={commonStates.status} />
        </Stack_l>
      </div>
      <div id="player-page" className="w-[100%] flex flex-1">
        {displayPage(currentPage)}
      </div>
    </div>
  )
}
