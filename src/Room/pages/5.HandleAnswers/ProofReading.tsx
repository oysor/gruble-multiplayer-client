import React, { FunctionComponent, useState } from 'react'
import { Player } from '../../../common/constants'
import { useAppSelector } from '../../hooks'
import { RoomState } from '../../store'
import * as S from '../../../common/everyLayout'
import { DisplayList } from '../../components/DisplayList'
import { SetWrongAnswerButton } from './SetWrongAnswerButton'
import {
  Board,
  InfoSquare,
  Row,
  Square,
  SquareInput,
} from '../../../common/components/boards'
import { Button } from '../../../common/components'
import { flagColor } from '../../../common/utilities'

interface ProofReadingProps {
  players: Player[]
}

export const ProofReading: FunctionComponent<ProofReadingProps> = ({ players }) => {
  const { boardDictionary, boardSettings } = useAppSelector(
    (state: RoomState) => state.room
  )
  const [playerRow, setplayerRow] = useState({ letter: 0, category: 0, player: 0 })
  const { categories, letters } = boardSettings

  const getCard = (player: Player, letter: number) => {
    const word = player.board[letter][playerRow.category].toLowerCase()
    return boardDictionary[letter][playerRow.category][word]
  }

  const showNextCategory = (next?: number) => {
    if (Number.isFinite(next) && next !== undefined) {
      setplayerRow({ ...playerRow, category: next })
    } else {
      const nextCategory =
        playerRow.category < categories.length - 1 ? playerRow.category + 1 : 0
      setplayerRow({ ...playerRow, category: nextCategory })
    }
  }

  return (
    <S.Box_l>
      <S.Stack_l space="0.5rem">
        <S.Center_l>
          <S.Cluster_l justify="center" space="1rem">
            <DisplayList
              list={categories}
              hightlight={playerRow.category}
              nextCategory={showNextCategory}
            />
          </S.Cluster_l>
        </S.Center_l>
        <S.Center_l>
          <Board className="text-[60%]">
            <Row>
              <Square firstInRow>
                <InfoSquare>
                  <span>{'Letters '}&rarr;</span>
                  <span>{'Players '}&darr;</span>
                </InfoSquare>
              </Square>

              {letters.map((letter, i) => {
                const currentLetter = i === playerRow.letter
                return (
                  <Square empty topRow highlight={currentLetter} key={i}>
                    {letter.toLocaleUpperCase()}
                  </Square>
                )
              })}
            </Row>
            {players.map((player, p) => {
              const currentPlayer = p == playerRow.player

              return (
                <Row key={p}>
                  <Square empty firstInRow highlight={currentPlayer}>
                    {player.name}
                  </Square>
                  {letters.map((letter, l) => {
                    const highLightSquare = l == playerRow.letter && p == playerRow.player
                    const card = getCard(player, l)

                    return (
                      <Square
                        empty
                        key={l}
                        highlightSquare={highLightSquare}
                        onClick={() => {
                          setplayerRow({ ...playerRow, letter: l, player: p })
                        }}
                      >
                        <SquareInput
                          color={flagColor(card.flag)}
                          defaultValue={player.board[p][l]}
                        >
                          {card.word}
                        </SquareInput>
                      </Square>
                    )
                  })}
                </Row>
              )
            })}
          </Board>
        </S.Center_l>

        <S.Cluster_l justify="center">
          <SetWrongAnswerButton
            player={players[playerRow.player]}
            square={{ letter: playerRow.letter, category: playerRow.category }}
          />
          <Button onClick={showNextCategory}>Next category</Button>

          {/* <SetFlagButton
          player={players[playerRow.player]}
          square={{ letter: playerRow.letter, category: playerRow.category }}
          text={'Correct'}
        /> */}
        </S.Cluster_l>
      </S.Stack_l>
    </S.Box_l>
  )
}
