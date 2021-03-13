import React, { FunctionComponent } from 'react'
import { ChangeFlag } from './ChangeFlag'
import { PlayerRow } from './PlayerRow'
import { WrongAnswerButton } from './WrongAnswerButton'
import { Player } from '../../../../common/constants'
import { flagColor } from '../../computation/calculation'
// import { PlayerAnswerBoard } from './PlayerAnswerBoard'

type HandleAnswersProps = {
  playerList: Player[]
  square: { letter: number; category: number }
}
/**
 * Iterates the playerslist and displays a row for each player.
 * Displays players input square for given letter and category.
 */
export const HandleAnswers: FunctionComponent<HandleAnswersProps> = ({
  square,
  playerList,
}) => {
  const { letter, category } = square

  const handlePlayer = (player: Player) => {
    const playerInput = player.scoreBoard[letter][category]
    return (
      <div key={player.name}>
        {/* <PlayerAnswerBoard player={player} square={square} /> */}
        <PlayerRow>
          <h3>{player.name}</h3>
          <div className={'score-square'} style={{ color: flagColor(playerInput.flag) }}>
            {playerInput.word}
          </div>
          <ChangeFlag player={player} square={{ letter: letter, category: category }} />
          <WrongAnswerButton
            player={player}
            square={{ letter: letter, category: category }}
          />
        </PlayerRow>
      </div>
    )
  }

  const handlePlayers = (
    <div className={'score-board'}>
      {playerList.map((player) => {
        return player.scoreBoard ? handlePlayer(player) : null
      })}
    </div>
  )

  return <div className={'handle-answers'}>{handlePlayers}</div>
}
