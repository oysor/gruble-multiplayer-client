import React, { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../../../common/components'
import { RoomState } from '../../roomStore'
import { ShowResults } from '../7.ShowResults'
import { HandleAnswers } from './HandleAnswers'

export const HandleResults: FunctionComponent = () => {
  const { playerList, boardSettings } = useSelector((state: RoomState) => state.room)
  const { categories, letters } = boardSettings
  const [categoryNr, nextCategory] = useState(0)
  const [letterNr, nextLetter] = useState(0)

  const showNextLetter = () => {
    nextLetter(letterNr < letters.length - 1 ? letterNr + 1 : 0)
  }

  const showNextCategory = () => {
    nextCategory(categoryNr < categories.length - 1 ? categoryNr + 1 : 0)
  }

  // Next component
  const [nextPage, setNext] = useState(true)

  return nextPage ? (
    <div className="handle-results">
      <div className="show-letter">
        <h2>{letters[letterNr]}</h2>
      </div>
      <div className="show-category">
        <h2>{categories[categoryNr]}</h2>
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
            setNext(false)
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
