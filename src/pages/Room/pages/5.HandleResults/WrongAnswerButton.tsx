import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flag, Player } from '../../../../common/constants'
import { getFlag } from '../../computation/calculation'
import { updatePlayerScoreBoard } from '../../roomReducer'
import { RoomState } from '../../roomStore'

type WrongAnswerButtonProps = {
  player: Player
  square: { letter: number; category: number }
}

export const WrongAnswerButton: FunctionComponent<WrongAnswerButtonProps> = ({
  player,
  square,
}) => {
  const dispatch = useDispatch()
  const { wordFrequencies } = useSelector((state: RoomState) => state.room)
  const { letter, category } = square
  const scoreCard = { ...player.scoreBoard[letter][category] }
  const freq = wordFrequencies[scoreCard.word].frequency

  return (
    <button
      onClick={() => {
        scoreCard.flag = scoreCard.flag !== Flag.Wrong ? Flag.Wrong : getFlag(freq)
        dispatch(updatePlayerScoreBoard({ player, square, scoreCard }))
      }}
    >
      Wrong
    </button>
  )
}
