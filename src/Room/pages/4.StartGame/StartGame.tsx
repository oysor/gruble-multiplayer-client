import React, { FunctionComponent, useState } from 'react'
import { RoomState } from '../../store'
import { setNextPage, startGame } from '../../reducer'
import { Button, MissingInput } from '../../../common/components'
import { ShowRoomInput } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { NavLink } from 'react-router-dom'
import { Box_l, Center_l, Stack_l } from '../../../common/everyLayout'
import { GameButton } from '../../../common/components/buttons'
// import { BoardTemplate } from '../../../common/components/boards/BoardTemplate'
import { ConnectionMode } from '../../../common/constants'

export const StartGame: FunctionComponent = () => {
  const { roomId, playerList, commonStates } = useAppSelector(
    (state: RoomState) => state.room
  )
  const dispatch = useAppDispatch()

  // Missing input warning
  const [reminder, setReminder] = useState(false)
  // const [boardTemplate, showBaordTemplet] = useState(false)
  const gameStart = playerList.length > 0

  const dispatchOnClick = () => {
    dispatch(startGame({ roomId: roomId }))
    dispatch(setNextPage())
  }

  return (
    <Box_l id="start-game">
      <Stack_l className="min-h-[23rem]">
        <Center_l intrinsic>
          <ShowRoomInput />
          <Button
            valid={!gameStart}
            onClick={() => {
              gameStart ? dispatchOnClick() : setReminder(!reminder)
            }}
          >
            Start Game
          </Button>
        </Center_l>
        {reminder ? (
          <Stack_l space="1rem" className="items-center">
            <MissingInput playerList={playerList} />
            <NavLink
              className="self-center"
              to={'/player'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GameButton> Open player tab</GameButton>
            </NavLink>
          </Stack_l>
        ) : null}
      </Stack_l>
      {/* <Box_l>
        {boardTemplate ? (
          <BoardTemplate categoryList={categories} letterList={letters} />
        ) : (
          <div
            className="text-center bg-color [#c4c4c4]"
            onClick={() => {
              showBaordTemplet(!boardTemplate)
            }}
          >
            Show board
          </div>
        )}
      </Box_l> */}
    </Box_l>
  )
}
