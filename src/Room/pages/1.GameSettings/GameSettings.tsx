import React, { FunctionComponent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { Box_l, Cluster_l } from '../../../common/everyLayout'
import { PondrButton } from '../../../common/components/buttons'
import { TimeSetting } from './TimeSetting'
import { RoomState } from '../../store'
import { CategorySetting } from './CategorySetting/CategorySetting'
import { createRoom, setNextPage, startGame } from '../../reducer'
import { Lobby } from './Lobby'
import { RoomIdCopyBox } from '../../components'
import { Grid, Leftbar, Logo, Main, Navigation, Rightbar } from './styles'
import headline from '../../../assets/images/pondr.png'
import { CreateRoom } from './CreateRoom'
import { SettingsInfo } from '../../../common/components/SettingsInfo'

export const GameSettings: FunctionComponent = () => {
  const { roomName, timeLimit, boardSettings, playerList } = useAppSelector(
    (state: RoomState) => state.room
  )

  const [current, setNext] = useState(0)
  const dispatch = useAppDispatch()

  const { categories } = boardSettings

  const [name, setName] = useState(roomName)

  const roomCreated = roomName.length > 1

  const exitRoom = current == 1 || current == 0
  const isCreateRoom = current == 0
  const isLobby = current === 3
  const settingsValid = timeLimit > 0 && categories.length > 0
  const playerJoined = playerList.length > 0
  const validName = name.length > 2
  const validButton = (settingsValid && playerJoined) || (current < 3 && validName)


  const createRoomOnClick = () => {
    dispatch(createRoom(name))
  }

  const startGameOnClick = () => {
    dispatch(startGame())
    dispatch(setNextPage())
  }

  function ShowComponent(component: number) {
    switch (component) {
      case 0:
        return <CreateRoom setName={setName} name={name} />
      case 1:
        return <TimeSetting />
      case 2:
        return <CategorySetting />
      case 3:
        return <Lobby />
      default:
        return <div>Error: Invalid User Role</div>
    }
  }

  return (
    <Grid>
      <Logo className="flex justify-center">
        <Box_l padding="1rem">
          <img src={headline} alt="Logo" height="20px" />
        </Box_l>
      </Logo>
      <Main>
        <div className="flex justify-center">{ShowComponent(current)}</div>
      </Main>
      <Leftbar>{roomCreated && <RoomIdCopyBox />}</Leftbar>
      <Rightbar>
        {isLobby && <SettingsInfo timeLimit={timeLimit} boardSettings={boardSettings} />}
      </Rightbar>
      <Navigation>
        <div className="flex justify-center h-[100%]">
          <Cluster_l justify="center" align="end" className="mb-[1rem]">
            <PondrButton
              invert
              onClick={() => {
                exitRoom ? history.back() : setNext(current - 1)
              }}
            >
              {exitRoom ? 'Exit' : 'Back'}
            </PondrButton>
            <PondrButton
              blurred={!validButton}
              disabled={!validButton}
              background={isLobby ? '#ff99bb' : '#FFFFFF'}
              valid={!validButton}
              onClick={() => {
                if (isCreateRoom) {
                  createRoomOnClick()
                }

                if (isLobby) {
                  startGameOnClick()
                } else {
                  setNext(current + 1)
                }
              }}
            >
              {isLobby ? 'Start game' : 'Next'}
            </PondrButton>
          </Cluster_l>
        </div>
      </Navigation>
    </Grid>
  )
}
