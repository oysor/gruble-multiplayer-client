import React, { FunctionComponent } from 'react'
import { Flag, Player } from '../../common/constants'
import { updateBoardDictionary } from '../reducer'
import { useAppDispatch, useAppSelector } from '../hooks'
import { RoomState } from '../store'

type SelectFlagProps = {
  player: Player
  square: { letter: number; category: number }
}

export const SelectFlag: FunctionComponent<SelectFlagProps> = ({ player, square }) => {
  const dispatch = useAppDispatch()
  const { letter, category } = square
  const { boardDictionary } = useAppSelector((state: RoomState) => state.room)

  const word = player.board[letter][category].toLowerCase()
  const flag = boardDictionary[letter][category][word].flag
  /*
   * Creates the list of options by iterating the enum Flag.
   */
  const optionList = Object.entries(Flag).map((flag) => {
    return (
      <option value={flag[1]} key={flag[1]}>
        {flag[0]}
      </option>
    )
  })

  return (
    <select
      value={flag}
      className="change-flag"
      onChange={(ev) => {
        dispatch(
          updateBoardDictionary({ square: square, word: word, flag: ev.target.value })
        )
      }}
    >
      {optionList}
    </select>
  )
}
