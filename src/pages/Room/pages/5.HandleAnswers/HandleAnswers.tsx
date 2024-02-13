import React, { FunctionComponent, useState } from 'react'
import { Button, Timer } from '../../../../common/components'
import { DisplayList } from '../../components/DisplayList'
import { setNextPage, setPlayerResults } from '../../roomReducer'
import { RoomState } from '../../roomStore'
import { updatePlayerListResults } from '../../utilities'
import { HandleSquare } from './HandleSquare'
import { useAppDispatch, useAppSelector } from '../../roomHooks'

export const HandleAnswers: FunctionComponent = () => {
  const { playerList, boardSettings, receivedBoards, commonStates } = useAppSelector(
    (state: RoomState) => state.room
  )
  const dispatch = useAppDispatch()
  const { categories, letters } = boardSettings
  const [categoryNr, nextCategory] = useState(0)
  const [letterNr, nextLetter] = useState(0)

  const showNextLetter = () => {
    nextLetter(letterNr < letters.length - 1 ? letterNr + 1 : 0)
  }

  const showNextCategory = () => {
    nextCategory(categoryNr < categories.length - 1 ? categoryNr + 1 : 0)
  }

  const dispatchOnClick = () => {
    const newPlayerList = updatePlayerListResults(playerList, boardSettings)
    dispatch(setPlayerResults(newPlayerList))
    dispatch(setNextPage())
  }

  return receivedBoards ? (
    <div className="handle-answers">
      <div className="show-info">
        <DisplayList list={letters} hightlight={letterNr} />
        <DisplayList list={categories} hightlight={categoryNr} />
      </div>
      <div className="show-answers">
        <HandleSquare
          playerList={playerList}
          square={{ letter: letterNr, category: categoryNr }}
        />
      </div>
      <div className="show-buttons">
        <Button onClick={showNextLetter}>Next letter</Button>
        <Button onClick={showNextCategory}>Next category</Button>
        <Button onClick={dispatchOnClick}>Show results!</Button>
      </div>
    </div>
  ) : (
    <Timer elapsedTime={commonStates.elapsedTime} />
  )
}
