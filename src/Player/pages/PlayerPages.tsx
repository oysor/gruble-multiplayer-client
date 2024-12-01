import React, { FunctionComponent } from 'react'
import { PlayerState } from '../store'
import {
  ChatBox,
  ConnectionStatus,
  PlayerList,
  PlayerListBox,
} from '../../common/components'
import { useAppSelector } from '../hooks'
import { Box_l, Center_l, Cover_l, Stack_l } from '../../common/everyLayout'
import { JoinGame } from './1.JoinGame'
import { Play } from './2.Play'
import { Results } from './3.Results'
import { DisconnectOverlay } from '../../common/components/connection/Disconnected'
import { ConnectionMode } from '../../common/constants'
import { SendMessage } from '../components/SendMessage'
import { GameClosed } from '../../common/components/connection'

export const PlayerPages: FunctionComponent = () => {
  const { commonStates, messages, currentPage, roomId, playerList, gameClosed } =
    useAppSelector((state: PlayerState) => state.player)
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
    <Cover_l centered="div">
      {!connected ? <DisconnectOverlay status={commonStates.status} /> : null}
      {gameClosed ? <GameClosed /> : null}
      <Box_l padding='1rem'>
        <ConnectionStatus status={commonStates.status} />
        <Center_l>{displayPage(currentPage)}</Center_l>
        {/* <div>{displayPage(currentPage)}</div> */}
        {/* {currentPage >= 2 ? (
          <Stack_l space="1rem" className="mt-[1rem]">
            <ChatBox messages={messages} />
            {roomId && <SendMessage roomId={roomId} />}
          </Stack_l>
        ) : null} */}
      </Box_l>
    </Cover_l>
  )
}
