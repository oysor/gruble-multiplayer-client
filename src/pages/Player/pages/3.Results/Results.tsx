import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { ResultTable } from '../../../../common/components'
import { PlayerState } from '../../playerStore'

export const Results: FunctionComponent = () => {
  const { receivedResult, playerList } = useSelector((state: PlayerState) => state.player)

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
