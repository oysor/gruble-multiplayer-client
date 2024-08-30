import React, { FunctionComponent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { Cluster_l } from '../../../common/everyLayout'
import { PondrButton } from '../../../common/components/buttons'
import { TimeSetting } from './TimeSetting'
import { RoomState } from '../../store'
import { CategorySetting } from './CategorySetting/CategorySetting'
import { setNextPage, startGame } from '../../reducer'
import { Lobby } from './Lobby'

export const GameSettings: FunctionComponent = () => {
  const { timeLimit, boardSettings, playerList } = useAppSelector(
    (state: RoomState) => state.room
  )
  const [current, setNext] = useState(0)
  const dispatch = useAppDispatch()

  const { categories } = boardSettings

  const isLobby = current === 2
  const settingsValid = timeLimit > 0 && categories.length > 0
  const playerJoined = playerList.length > 0
  const couldStartGame = settingsValid && playerJoined
  const exitRoom = current == 0

  const startGameOnClick = () => {
    dispatch(startGame())
    dispatch(setNextPage())
  }

  function ShowComponent(component: number) {
    switch (component) {
      case 0:
        return <TimeSetting />
      case 1:
        return <CategorySetting />
      case 2:
        return <Lobby />
      default:
        return <div>Error: Invalid User Role</div>
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <div className="flex-1 ">{ShowComponent(current)}</div>
      <div className="flex flex-col">
        <div className="flex-1 flex flex-col">
          <Cluster_l justify="center" align="end" className="mb-[1rem]">
            <PondrButton
              invert
              onClick={() => {
                exitRoom ? history.back() : setNext(current - 1)
              }}
            >
              {exitRoom ? 'Exit' : 'Back'}
            </PondrButton>
            {isLobby && (
              <PondrButton
                blurred={!couldStartGame}
                disabled={!couldStartGame}
                valid={!couldStartGame}
                background="#ff99bb"
                onClick={() => startGameOnClick()}
              >
                Start game
              </PondrButton>
            )}

            {!isLobby && (
              <PondrButton
                onClick={() => {
                  setNext(current + 1)
                }}
              >
                Next
              </PondrButton>
            )}
          </Cluster_l>
        </div>
      </div>
    </div>
  )
}
