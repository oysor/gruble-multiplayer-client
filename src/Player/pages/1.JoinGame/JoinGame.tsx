import React, { FunctionComponent, useMemo, useState } from 'react'
import { checkRoom, joinRoom } from '../../reducer'
import { PlayerState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Cluster_l } from '../../../common/everyLayout'
import { TopLogo } from '../../../common/components/Logo'
import { PondrButton } from '../../../common/components/buttons'
import { EnterCode } from './EnterCode'
import { EnterName } from './EnterName'
import { Lobby } from './Lobby'
import { SettingsInfo } from '../../../common/components/SettingsInfo'
import { PlayerIdCopyBox } from '../../components/PlayerCopyIdBox'
import {
  Grid,
  Leftbar,
  Logo,
  Main,
  Navigation,
  Rightbar,
} from '../../../common/components/Grid'

export const JoinGame: FunctionComponent = () => {
  const { roomId, timeLimit, boardSettings, serverMessage } = useAppSelector(
    (state: PlayerState) => state.player
  )
  const dispatch = useAppDispatch()

  const [roomCode, setCode] = useState('')
  const [username, setName] = useState('')
  const [current, setCurrent] = useState(0)

  useMemo(() => {
    roomId !== '' && setCurrent(2)
  }, [roomId])

  useMemo(() => {
    serverMessage[serverMessage.length - 1] === '1' && setCurrent(1)
  }, [serverMessage])

  const lastMessage = serverMessage[serverMessage.length - 1]
  const userReply = lastMessage === '1' ? '' : lastMessage
  const validName = username.length > 0
  const validCode = roomCode.length > 0
  const enterCode = current == 0
  const enterName = current == 1
  const inLobby = current == 2
  const exitRoom = enterCode
  const validButton = (enterCode && validCode) || (enterName && validName)

  const dispatchOnClick = async () => {
    if (enterCode) {
      dispatch(checkRoom({ roomId: roomCode }))
    } else if (enterName && validName) {
      dispatch(joinRoom({ roomId: roomCode.toUpperCase(), playerName: username }))
    }
  }

  function ShowComponent(component: number) {
    switch (component) {
      case 0:
        return <EnterCode setCode={setCode} roomCode={roomCode} msg={userReply} />
      case 1:
        return <EnterName setName={setName} username={username} />
      case 2:
        return <Lobby />
      default:
        return <div>Error: Invalid User Role</div>
    }
  }

  return (
    <Grid>
      <Logo className="flex justify-center">
        <TopLogo />
      </Logo>
      <Main>
        <div className="flex justify-center">{ShowComponent(current)}</div>
      </Main>
      <Leftbar>{inLobby && <PlayerIdCopyBox />}</Leftbar>
      <Rightbar>
        <SettingsInfo timeLimit={timeLimit} boardSettings={boardSettings} />
      </Rightbar>
      <Navigation>
        {!inLobby && (
          <div className="flex justify-center h-[100%]">
            <Cluster_l justify="center" align="end" className="mb-[1rem]">
              <PondrButton
                invert
                onClick={() => {
                  if (exitRoom) {
                    history.back()
                  } else {
                    setCurrent(0)
                  }
                }}
              >
                {enterCode ? 'Exit' : 'Back'}
              </PondrButton>
              <PondrButton
                blurred={!validButton}
                disabled={!validButton}
                valid={!validButton}
                onClick={dispatchOnClick}
              >
                {'Next'}
              </PondrButton>
            </Cluster_l>
          </div>
        )}
      </Navigation>
    </Grid>
  )
}
