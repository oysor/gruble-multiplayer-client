import React, { FunctionComponent } from 'react'
import { Flag, Player } from '../../../../common/constants'
import { updatePlayerScoreBoard } from '../../roomReducer'
import { RoomState } from '../../roomStore'
import { getFlag } from '../../utilities'
import { useAppDispatch, useAppSelector } from '../../roomHooks'

type SetWrongAnswerButtonProps = {
  player: Player
  square: { letter: number; category: number }
}

export const SetWrongAnswerButton: FunctionComponent<SetWrongAnswerButtonProps> = ({
  player,
  square,
}) => {
  const dispatch = useAppDispatch()
  const { wordDictionary } = useAppSelector((state: RoomState) => state.room)
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
