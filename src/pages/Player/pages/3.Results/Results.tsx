import React, { FunctionComponent } from 'react'
import { ResultTable } from '../../../../common/components'
import { PlayerState } from '../../playerStore'
import { useAppSelector } from '../../playerHooks'

export const Results: FunctionComponent = () => {
  const { receivedResult, playerList } = useAppSelector(
    (state: PlayerState) => state.player
  )

  return (
    <div className="show-results">
      {receivedResult ? (
        <ResultTable playerList={playerList} />
      ) : (
        <h2>Waiting for results...</h2>
      )}
    </div>
  )
}
