import React, { FunctionComponent } from 'react'
import { ResultTable } from '../../../../common/components'
import { PlayerState } from '../../playerStore'
import { useAppSelector } from '../../playerHooks'
import { Box_l, Stack_l } from '../../../../common/styledComponents/everyLayout'
import { ResultBoard } from '../../../../common/components/ResultBoard'

export const Results: FunctionComponent = () => {
  const { receivedResult, playerList, boardDictionary, boardSettings } = useAppSelector(
    (state: PlayerState) => state.player
  )

  return (
    <div className="show-results">
      {receivedResult ? (
        <Box_l>
          <ResultTable playerList={playerList} />
          {playerList.map((player, i) => {
            return (
              <Stack_l key={i}>
                <h2>{player.name}</h2>
                <ResultBoard
                  player={player}
                  boardDictionary={boardDictionary}
                  boardSettings={boardSettings}
                />
              </Stack_l>
            )
          })}
        </Box_l>
      ) : (
        <h2>Waiting for results...</h2>
      )}
    </div>
  )
}
