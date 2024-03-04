import React, { FunctionComponent } from 'react'
import { RoomState } from './roomStore'
import {
  ConnectionStatus,
  MessageBox,
  PlayerList,
  PlayerMessageBox,
} from '../../common/components/'
import { PrepareBoard, StartGame, HandleAnswers, ShowResults } from './pages'
import { useAppSelector } from './roomHooks'
import { PrepareRoom } from './pages/1.PrepareRoom'
import { styled } from 'styled-components'
import { Cover_l } from '../../common/styledComponents/everyLayout'

export const RoomLayout: FunctionComponent = () => {
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
      <div className="layout-header">
        {/* <div className="header-logo">Create a room</div> */}
        <ConnectionStatus status={commonStates.status} />
      </div>
      <div className="layout-main">{showComponent(currentPage)}</div>
      <div className="layout-bottom">
        <PlayerList playerList={playerList} />
        <div className="message-boxes">
          <MessageBox messages={messages} />
          {/* <PlayerMessageBox playerMessages={playerMessages} /> */}
        </div>
      </div>
    </Cover_l>
  )
}
