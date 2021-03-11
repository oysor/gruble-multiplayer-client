import React, { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../../../common/components'
import { RoomState } from '../../roomStore'
import { ShowResults } from '../7.ShowResults'
import { DisplayList } from './DisplayList'
import { HandleAnswers } from './HandleAnswers'

export const HandleResults: FunctionComponent = () => {
  const { playerList, boardSettings } = useSelector((state: RoomState) => state.room)
  const { categories, letters } = boardSettings
  const [categoryNr, nextCategory] = useState(0)
  const [letterNr, nextLetter] = useState(0)
  // Next page/component
  const [nextPage, setNext] = useState(false)

  const showNextLetter = () => {
    nextLetter(letterNr < letters.length - 1 ? letterNr + 1 : 0)
  }

  const showNextCategory = () => {
    nextCategory(categoryNr < categories.length - 1 ? categoryNr + 1 : 0)
  }

  return !nextPage ? (
    <div className="handle-results">
      <div className="show-info">
        <DisplayList list={letters} hightlight={letterNr} />
        <DisplayList list={categories} hightlight={categoryNr} />
      </div>
      <div className="show-answers">
        <HandleAnswers
          playerList={playerList}
          square={{ letter: letterNr, category: categoryNr }}
        />
      </div>
      <div className="show-buttons">
        <Button onClick={showNextLetter}>Next letter</Button>
        <Button onClick={showNextCategory}>Next category</Button>
        <Button
          onClick={() => {
            setNext(true)
          }}
        >
          Show results!
        </Button>
      </div>
    </div>
  ) : (
    <ShowResults />
  )
}
