import React, { FunctionComponent } from 'react'
import { SelectFlag } from './SelectFlag'
import { PlayerRow } from './PlayerRow'
import { SetWrongAnswerButton } from './SetWrongAnswerButton'
import { Player } from '../../../../common/constants'
import { flagColor } from '../../utilities'

type HandleSquareProps = {
  playerList: Player[]
  square: { letter: number; category: number }
}
/**
 * Iterates the playerslist and displays a row for each player.
 * Displays players input square for given letter and category.
 */
export const HandleSquare: FunctionComponent<HandleSquareProps> = ({
  square,
  playerList,
}) => {
  const { letter, category } = square

  const handlePlayer = (player: Player) => {
    const playerInput = player.scoreBoard[letter][category]
    return (
      <div key={player.name}>
        <PlayerRow>
          <h3>{player.name}</h3>
          <span style={{ color: flagColor(playerInput.flag) }}>{playerInput.word}</span>
          <SelectFlag player={player} square={{ letter: letter, category: category }} />
          <SetWrongAnswerButton
            player={player}
            square={{ letter: letter, category: category }}
          />
        </PlayerRow>
      </div>
    )
  }

  const handlePlayers = (
    <div className={'answer-board'}>
      {playerList.map((player) => {
        return player.scoreBoard ? handlePlayer(player) : null
      })}
    </div>
  )

  return <div className={'handle-square'}>{handlePlayers}</div>
}
