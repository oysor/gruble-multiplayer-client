import React, { FunctionComponent, useState } from 'react'
import { SelectFlag } from './SelectFlag'
import { PlayerRow } from './PlayerRow'
import { Player } from '../../common/constants'
import { Box_l, Center_l, Cluster_l, Stack_l } from '../../common/everyLayout'
import { DisplayList } from '.'
import { Button } from '../../common/components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { RoomState } from '../store'
import { css, styled } from 'styled-components'
import { SetWrongAnswerButton } from '../pages/5.HandleAnswers/SetWrongAnswerButton'
import { CorrectAnswerButton } from './CorrectAnswerButton'
import { SetFlagButton } from './SetFlagButton'
import { flagColor } from '../../common/utilities'

const ColumnName = styled.div`
  text-decoration: underline;
  /* text-align: center; */
`

type ItemProps = {
  highlight?: boolean
}

const Item = styled.div<ItemProps>`
  /* min-height: 4rem;
  background: #efefef; */

  /* text-align: center; */
  border: 1px solid white;
  cursor: pointer;
  padding: 0.4rem;

  ${(props) =>
    props.highlight &&
    css`
      /* font-size: x-large; */
      /* border: 1px solid black; */
      /* color: black; */
      border: 1px dotted black;
    `}
`

type PlayerResultsProps = {
  playerList: Player[]
  boardSettings: { categories: string[]; letters: string[] }
  coords: { y: number; x: number }
  setCurrentSquare: (coords: { x: number; y: number }) => void
  showNextCategory: (i?: number) => void
}
/**
 * Iterates the playerslist and displays a row for each player.
 * Displays players input square for given letter and category.
 */
export const PlayerResults: FunctionComponent<PlayerResultsProps> = ({
  coords,
  playerList,
  boardSettings,
  setCurrentSquare,
  showNextCategory,
}) => {
  const { y, x } = coords
  const { categories, letters } = boardSettings

  const { boardDictionary } = useAppSelector((state: RoomState) => state.room)

  const [playerWord, setPlayerWord] = useState({ x: 0, y: 0, player: 0 })

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

  const playerNames = () => {
    return (
      <Cluster_l>
        {playerList.map((player, i) => {
          return <div key={i}>{player.name}</div>
        })}
      </Cluster_l>
    )
  }

  const playerAnswers = () => {
    return (
      <Cluster_l justify="center">
        {playerList.map((player, p) => {
          return (
            <Box_l key={player.name} padding="1rem" backgroundColor={player.color}>
              <Stack_l key={player.name} space="1rem">
                <ColumnName>{player.name}</ColumnName>
                {categories.map((category, c) => {
                  const highLightSquare = c == playerWord.x && p == playerWord.player
                  const word = player.board[c][coords.y].toLowerCase()
                  const card = boardDictionary[c][coords.y][word]
                  return (
                    <Box_l key={category} borderWidth="1px">
                      <Item
                        key={category}
                        style={{ color: flagColor(card.flag) }}
                        onClick={() => {
                          // setCurrentSquare({ x: c, y: coords.y })
                          setPlayerWord({ x: c, y: coords.y, player: p })
                        }}
                        highlight={highLightSquare}
                      >
                        {card.word}
                      </Item>
                    </Box_l>
                  )
                })}
              </Stack_l>
            </Box_l>
          )
        })}
      </Cluster_l>
    )
  }

  return (
    <Box_l>
      <Center_l>
        <Cluster_l justify="center" space="1rem">
          <DisplayList
            list={categories}
            hightlight={coords.y}
            nextCategory={showNextCategory}
          />
          {/* <DisplayList list={letters} hightlight={coords.y} /> */}
        </Cluster_l>
      </Center_l>

      {/* <Button onClick={UpdateScoreBoard}>Next category</Button> */}

      {playerAnswers()}
      <Cluster_l justify="space-around">
        <SetWrongAnswerButton
          player={playerList[playerWord.player]}
          square={{ letter: playerWord.x, category: playerWord.y }}
        />
        <SetFlagButton
          player={playerList[playerWord.player]}
          square={{ letter: playerWord.x, category: playerWord.y }}
          text={'Correct'}
        />
      </Cluster_l>
    </Box_l>
  )
}
