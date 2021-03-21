import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { Flag, Player } from '../../../../common/constants'
import { updatePlayerScoreBoard } from '../../roomReducer'

type SelectFlagProps = {
  player: Player
  square: { letter: number; category: number }
}

export const SelectFlag: FunctionComponent<SelectFlagProps> = ({ player, square }) => {
  const dispatch = useDispatch()
  const { letter, category } = square

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
      value={player.scoreBoard[letter][category].flag}
      className="change-flag"
      onChange={(ev) => {
        const scoreCard = {
          flag: ev.target.value,
          word: player.scoreBoard[letter][category].word,
        }
        const square = { letter: letter, category: category }
        dispatch(updatePlayerScoreBoard({ player, square, scoreCard }))
      }}
    >
      {optionList}
    </select>
  )
}
