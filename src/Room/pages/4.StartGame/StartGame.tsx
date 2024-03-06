import React, { FunctionComponent, useState } from 'react'
import { RoomState } from '../../store'
import { setNextPage, startGame } from '../../reducer'
import { Button, MissingInput } from '../../../common/components'
import { ShowRoomInput } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { NavLink } from 'react-router-dom'
import { Box_l, Center_l, Stack_l } from '../../../common/everyLayout'
import { GameButton } from '../../../common/components/buttons'
import { styled } from 'styled-components'

export const StartGame: FunctionComponent = () => {
  const { roomId, playerList } = useAppSelector((state: RoomState) => state.room)
  const dispatch = useAppDispatch()
  // Missing input warning
  const [reminder, setReminder] = useState(false)
  const gameStart = playerList.length > 0

  const dispatchOnClick = () => {
    console.log('PAYLOUD')
    console.log(roomId)
    dispatch(startGame({ roomId: roomId })), dispatch(setNextPage())
  }

  // const CenterBox = styled.div`
  //   display: flex;
  //   flex-wrap: wrap;
  //   flex-direction: column;
  // `

  return (
    <Box_l id="start-game" className="min-h-[20rem]">
      <Stack_l>
        <Center_l>
          <ShowRoomInput />
          <Button
            onClick={() => {
              gameStart ? dispatchOnClick() : setReminder(!reminder)
            }}
          >
            Start Game
          </Button>
        </Center_l>
        {reminder ? (
          <Stack_l space="1rem">
            <MissingInput playerList={playerList} />
            <NavLink
              className="self-center"
              to={'/player'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GameButton> Open new player tab</GameButton>
            </NavLink>
          </Stack_l>
        ) : null}
      </Stack_l>
    </Box_l>
  )
}
