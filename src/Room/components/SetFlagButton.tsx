import React, { FunctionComponent } from 'react'
import { Flag, Player, SquareCoords } from '../../common/constants'
import { updateBoardDictionary } from '../reducer'
import { RoomState } from '../store'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Button } from '../../common/components'
import { getFlag } from '../../common/utilities'

type SetFlagButtonProps = {
  player: Player
  square: SquareCoords
  invert?: boolean
  text: string
}

export const SetFlagButton: FunctionComponent<SetFlagButtonProps> = ({
  player,
  square,
  text,
  invert,
}) => {
  const dispatch = useAppDispatch()
  const { boardDictionary } = useAppSelector((state: RoomState) => state.room)
  const { letter, category } = square
  const word = player.board[letter][category].toLowerCase()
  const card = boardDictionary[letter][category][word]

  let newFlag = getFlag(card.frequency)

  if (invert) {
    newFlag = card.flag !== Flag.Wrong ? Flag.Wrong : getFlag(card.frequency)
  }

  return (
    <Button
      onClick={() => {
        dispatch(
          updateBoardDictionary({ square: square, word: card.word, flag: newFlag })
        )
      }}
    >
      {text}
    </Button>
  )
}
