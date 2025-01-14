import React, { FunctionComponent } from 'react'
import { Flag, Player, SquareCoords } from '../../../common/constants'
import { updateBoardDictionary } from '../../reducer'
import { RoomState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Button } from '../../../common/components'
import { getFlag } from '../../../common/utilities'

type SetWrongAnswerButtonProps = {
  player: Player
  square: SquareCoords
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
