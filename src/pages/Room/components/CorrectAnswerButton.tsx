import React, { FunctionComponent } from 'react'
import { Flag, Player } from '../../../common/constants'
import { updateBoardDictionary } from '../roomReducer'
import { RoomState } from '../roomStore'
import { getFlag } from '../utilities'
import { useAppDispatch, useAppSelector } from '../roomHooks'

import { StyledButton } from '../../../common/components/Button'

type CorrectAnswerButtonProps = {
  player: Player
  square: { letter: number; category: number }
  invert?: boolean
}

export const CorrectAnswerButton: FunctionComponent<CorrectAnswerButtonProps> = ({
  player,
  square,
  invert,
}) => {
  const dispatch = useAppDispatch()
  const { boardDictionary } = useAppSelector((state: RoomState) => state.room)
  const { letter, category } = square
  const word = player.board[letter][category].toLowerCase()
  const card = boardDictionary[letter][category][word]

  let newFlag = getFlag(card.frequency)

  const isWrong = card.flag === Flag.Wrong

  if (invert) {
    newFlag = card.flag !== Flag.Wrong ? Flag.Wrong : getFlag(card.frequency)
  }

  return (
    <StyledButton
      // className="button"
      highlight={isWrong}
      onClick={() => {
        dispatch(
          updateBoardDictionary({ square: square, word: card.word, flag: newFlag })
        )
      }}
    >
      Correct
    </StyledButton>
  )
}
