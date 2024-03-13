import React, { FunctionComponent } from 'react'
import { PlayerState } from '../store'
import {
  ConnectionStatus,
  MessageBox,
  PlayerList,
  PlayerMessageBox,
} from '../../common/components'
// import { ShowPlayerInput } from './components'
import { SendMessage } from '../components/SendMessage'
import { useAppSelector } from '../hooks'
import { Center_l, Cover_l } from '../../common/everyLayout'
import { JoinGame } from './1.JoinGame'
import { Play } from './2.Play'
import { Results } from './3.Results'
import { DisconnectedCover } from '../../common/components/Connection/Disconnected'
import { ConnectionMode } from '../../common/constants'

export const PlayerPages: FunctionComponent = () => {
  const { commonStates, messages, currentPage, roomId, playerMessages, playerList } =
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
      {!connected ? <DisconnectedCover status={commonStates.status} /> : null}
      <Center_l>
        <ConnectionStatus status={commonStates.status} />
        <Center_l>{displayPage(currentPage)}</Center_l>
        <PlayerList playerList={playerList} />
        {/* <Box_l>
          <MessageBox messages={messages} />
          <PlayerMessageBox playerMessages={playerMessages} />
        </Box_l> */}
      </Center_l>
    </Cover_l>
  )
}
