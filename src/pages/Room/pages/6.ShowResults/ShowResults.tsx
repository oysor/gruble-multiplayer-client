import React, { FunctionComponent } from 'react'
import { ResultTable } from '../../../../common/components'
import { RoomState } from '../../roomStore'
import { useAppSelector } from '../../roomHooks'

export const ShowResults: FunctionComponent = () => {
  const { playerList } = useAppSelector((state: RoomState) => state.room)

  return (
    <div className="show-results">
      <ResultTable playerList={playerList} />
    </div>
  )
}
