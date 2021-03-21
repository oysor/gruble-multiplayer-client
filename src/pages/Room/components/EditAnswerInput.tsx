import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Player } from '../../../common/constants'
import { updatePlayerScoreBoard } from '../roomReducer'
import { RoomState } from '../roomStore'
import { flagColor, newScoreCard } from '../utilities'

type EditAnswerInputProps = {
  player: Player
  square: { letter: number; category: number }
}
/**
 * TODO
 * This component does not work.
 * To make it work: wordDictionary must be updated for all players for each input?
 */
export const EditAnswerInput: FunctionComponent<EditAnswerInputProps> = ({
  player,
  square,
}) => {
  const dispatch = useDispatch()
  const { letter, category } = square
  const oldInput = player.scoreBoard[letter][category]
  const { boardSettings, wordDictionary } = useSelector((state: RoomState) => state.room)

  return (
    <input
      className="answer-edit"
      type="text"
      style={{ color: flagColor(oldInput.flag) }}
      value={oldInput.word}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        const newInputWord = ev.target.value
        const scoreCard = newScoreCard(
          newInputWord,
          boardSettings.letters[letter],
          wordDictionary
        )
        dispatch(updatePlayerScoreBoard({ player, square, scoreCard }))
      }}
    />
  )
}
