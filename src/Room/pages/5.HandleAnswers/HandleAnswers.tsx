import React, { FunctionComponent, useState } from 'react'
import { Button } from '../../../common/components'
import { setNextPage, setPlayerResults } from '../../reducer'
import { RoomState } from '../../store'
import { updatePlayerListResults } from '../../utilities'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { HandleBoard } from './HandleBoard'
import { Box_l, Center_l, Cluster_l, Stack_l } from '../../../common/everyLayout'
import { SetWrongAnswerButton } from '../../components/SetWrongAnswerButton'
import { ProofReading } from '../../components/ProofReading'
import { CountDown } from '../../../common/components/timer'

export const HandleAnswers: FunctionComponent = () => {
  const {
    playerList,
    boardSettings,
    receivedBoards,
    commonStates,
    timeLimit,
    boardDictionary,
  } = useAppSelector((state: RoomState) => state.room)

  const { elapsedTime } = commonStates
  const dispatch = useAppDispatch()
  const { categories, letters } = boardSettings
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [currentPlayer, setNextPlayer] = useState(0)

  // const { x, y } = coords

  // const showNextLetter = () => {
  //   const nextLetter = y < letters.length - 1 ? y + 1 : 0
  //   setCoords({ y: nextLetter, x: x })
  // }

  // const showNextCategory = (next?: number) => {
  //   if (Number.isFinite(next) && next !== undefined) {
  //     setCoords({ x: next, y: y })
  //   } else {
  //     const nextCategory = x < categories.length - 1 ? x + 1 : 0
  //     console.log(nextCategory)
  //     console.log(coords)
  //     setCoords({ x: nextCategory, y: y })
  //   }
  // }

  const showNextPlayer = () => {
    const nextPlayer = currentPlayer + 1 !== playerList.length ? currentPlayer + 1 : 0

    console.log(currentPlayer)
    console.log(playerList.length)

    setNextPlayer(nextPlayer)
  }

  const dispatchOnClick = () => {
    const newPlayerList = updatePlayerListResults(
      playerList,
      boardSettings,
      boardDictionary
    )
    const sendThisToAllPlayers = { newPlayerList, boardDictionary }
    dispatch(setPlayerResults(sendThisToAllPlayers))
    dispatch(setNextPage())
  }

  return receivedBoards ? (
    <Box_l id="handle-answers">
      <Center_l max-width="50rem">
        <Stack_l space="2rem">
          <Center_l intrinsic>
            <h2>{playerList[currentPlayer].name}</h2>
            <HandleBoard
              player={playerList[currentPlayer]}
              boardSettings={{ categories: categories, letters: letters }}
              currentSquare={coords}
              setCurrentSquare={setCoords}
            />
            <Cluster_l align="center">
              <SetWrongAnswerButton
                player={playerList[currentPlayer]}
                square={{ letter: coords.y, category: coords.x }}
              />
              <Button onClick={showNextPlayer}>Next player board</Button>
            </Cluster_l>
          </Center_l>
          <ProofReading players={playerList} />
          <Center_l>
            <Button onClick={dispatchOnClick}>Show results!</Button>
          </Center_l>
        </Stack_l>
      </Center_l>
    </Box_l>
  ) : (
    <CountDown timeLeft={elapsedTime} timeLimit={timeLimit} />
  )
}
