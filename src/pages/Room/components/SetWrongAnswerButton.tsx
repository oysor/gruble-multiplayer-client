import React, { FunctionComponent } from 'react'
import { Flag, Player } from '../../../common/constants'
import { updateBoardDictionary } from '../roomReducer'
import { RoomState } from '../roomStore'
import { useAppDispatch, useAppSelector } from '../roomHooks'
import { Button } from '../../../common/components'
import { getFlag } from '../../../common/utilities'

type SetWrongAnswerButtonProps = {
  player: Player
  square: { letter: number; category: number }
}

export const SetWrongAnswerButton: FunctionComponent<SetWrongAnswerButtonProps> = ({
  player,
  square,
}) => {
  const dispatch = useAppDispatch()
  const { boardDictionary } = useAppSelector((state: RoomState) => state.room)
  const { letter, category } = square
  const word = player.board[letter][category].toLowerCase()
  const card = boardDictionary[letter][category][word]

  return (
    <Button
      onClick={() => {
        const newFlag = card.flag !== Flag.Wrong ? Flag.Wrong : getFlag(card.frequency)
        dispatch(
          updateBoardDictionary({ square: square, word: card.word, flag: newFlag })
        )
      }}
    >
      Wrong
    </Button>
  )
}
