import React, { FunctionComponent } from 'react'
import { PlayerState } from '../store'
import {
  ChatBox,
  ConnectionStatus,
  MessageBox,
  PlayerList,
  PlayerListBox,
} from '../../common/components'
import { useAppSelector } from '../hooks'
import { Center_l, Cover_l, Stack_l } from '../../common/everyLayout'
import { JoinGame } from './1.JoinGame'
import { Play } from './2.Play'
import { Results } from './3.Results'
import { DisconnectedCover } from '../../common/components/connection/Disconnected'
import { ConnectionMode } from '../../common/constants'
import { SendMessage } from '../components/SendMessage'
import { GameClosed } from '../../common/components/connection'

export const PlayerPages: FunctionComponent = () => {
  const {
    commonStates,
    messages,
    currentPage,
    playerMessages,
    roomId,
    playerList,
    gameClosed,
  } = useAppSelector((state: PlayerState) => state.player)
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
      {!connected ? <DisconnectedCover status={commonStates.status} /> : null}
      {gameClosed ? <GameClosed /> : null}
      <Center_l intrinsic>
        <ConnectionStatus status={commonStates.status} />
        <Center_l>{displayPage(currentPage)}</Center_l>
        {currentPage >= 2 ? (
          <Stack_l space="1rem" className="mt-[1rem]">
            <MessageBox messages={messages} />
            <PlayerListBox playerList={playerList} />
            <ChatBox messages={playerMessages} />
            {roomId && <SendMessage roomId={roomId} />}
          </Stack_l>
        ) : null}
      </Center_l>
    </Cover_l>
  )
}
