import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { ResultTable } from '../../../../common/components'
import { RoomState } from '../../roomStore'

export const ShowResults: FunctionComponent = () => {
  const { playerList } = useSelector((state: RoomState) => state.room)

  return (
    <div className="show-results">
      <ResultTable playerList={playerList} />
    </div>
  )
}
