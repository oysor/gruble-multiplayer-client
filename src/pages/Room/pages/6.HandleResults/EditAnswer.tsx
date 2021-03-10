import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Player } from '../../../../common/constants'
import { flagColor, newScoreCard } from '../../computation/calculation'
import { updatePlayerScoreBoard } from '../../roomReducer'
import { RoomState } from '../../roomStore'

type EditAnswerProps = {
  player: Player
  square: { letter: number; category: number }
}
/**
 * TODO
 * This component does not work.
 * To make it work: wordFrequencies must be updated for all players for each input?
 */
export const EditAnswer: FunctionComponent<EditAnswerProps> = ({ player, square }) => {
  const dispatch = useDispatch()
  const { letter, category } = square
  const oldInput = player.scoreBoard[letter][category]
  const { boardSettings, wordFrequencies } = useSelector((state: RoomState) => state.room)

  return (
    <input
      className="score-edit"
      type="text"
      style={{ color: flagColor(oldInput.flag) }}
      value={oldInput.word}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        const newInputWord = ev.target.value
        const scoreCard = newScoreCard(
          newInputWord,
          boardSettings.letters[letter],
          wordFrequencies
        )
        dispatch(updatePlayerScoreBoard({ player, square, scoreCard }))
      }}
    />
  )
}
