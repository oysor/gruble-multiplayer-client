import React, { FunctionComponent } from 'react'
import { SelectFlag } from './SelectFlag'
import { PlayerRow } from './PlayerRow'
import { Player } from '../../../common/constants'
import { useAppSelector } from '../../hooks'
import { RoomState } from '../../store'
import { flagColor } from '../../../common/utilities'

type HandleSquareProps = {
  playerList: Player[]
  square: { y: number; x: number }
}
/**
 * Iterates the playerslist and displays a row for each player.
 * Displays players input square for given letter and category.
 */
export const HandleSquare: FunctionComponent<HandleSquareProps> = ({
  square,
  playerList,
}) => {
  const { y, x } = square
  const { boardDictionary } = useAppSelector((state: RoomState) => state.room)

  const handlePlayer = (player: Player) => {
    const word = player.board[y][x].toLowerCase()
    const card = boardDictionary[y][x][word]

    return (
      <div key={player.name}>
        <PlayerRow>
          {/* <h3>{player.name}</h3> */}

          <span style={{ color: flagColor(card.flag) }}>{word}</span>
          <SelectFlag player={player} square={{ letter: y, category: x }} />
          {/* <SetWrongAnswerButton player={player} square={{ letter: y, category: x }} /> */}
        </PlayerRow>
      </div>
    )
  }

  const handlePlayers = (
    <div className={'answer-board'}>
      {playerList.map((player) => {
        return player.board ? handlePlayer(player) : null
      })}
    </div>
  )

  return <div className={'handle-square'}>{handlePlayers}</div>
}
