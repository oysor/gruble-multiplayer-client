import React, { FunctionComponent } from 'react'
import { Cluster_l } from '../../../common/styledComponents/everyLayout'
import { Player } from '../../../common/constants'

type DisplayList = {
  list: string[]
  hightlight?: number
  nextCategory: (i?: number) => void
}

export const DisplayList: FunctionComponent<DisplayList> = ({
  list,
  hightlight,
  nextCategory,
}) => {
  const displayList = list.map((item, i) => {
    const color = i === hightlight ? ' highlight' : ''
    return (
      <span className={'word-item' + color} key={i} onClick={() => nextCategory(i)}>
        {item}
      </span>
    )
  })

  return (
    <div className="display-words">
      {displayList}
      {/* <span className={'list-item higlight'} onClick={() => nextCategory()}>
        {'>'}
      </span> */}
    </div>
  )
}

type PlayerNamesProps = {
  playerList: Player[]
}

export const PlayerNames: FunctionComponent<PlayerNamesProps> = ({ playerList }) => {
  return (
    <Cluster_l>
      {playerList.map((player, i) => {
        return <div key={i}>{player.name}</div>
      })}
    </Cluster_l>
  )
}
