import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flag, Player } from '../../../../common/constants'
import { updatePlayerScoreBoard } from '../../roomReducer'
import { RoomState } from '../../roomStore'
import { getFlag } from '../../utilities'

type SetWrongAnswerButtonProps = {
  player: Player
  square: { letter: number; category: number }
}

export const SetWrongAnswerButton: FunctionComponent<SetWrongAnswerButtonProps> = ({
  player,
  square,
}) => {
  const dispatch = useDispatch()
  const { wordDictionary } = useSelector((state: RoomState) => state.room)
  const { letter, category } = square
  const scoreCard = { ...player.scoreBoard[letter][category] }
  const freq = wordDictionary[scoreCard.word].frequency

  return (
    <button
      className="set-wrong-answer-button"
      onClick={() => {
        scoreCard.flag = scoreCard.flag !== Flag.Wrong ? Flag.Wrong : getFlag(freq)
        dispatch(updatePlayerScoreBoard({ player, square, scoreCard }))
      }}
    >
      Wrong
    </button>
  )
}
