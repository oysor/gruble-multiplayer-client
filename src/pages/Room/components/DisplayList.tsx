import React, { FunctionComponent } from 'react'

type DisplayList = {
  list: string[]
  hightlight?: number
}

export const DisplayList: FunctionComponent<DisplayList> = ({ list, hightlight }) => {
  const displayList = list.map((item, i) => {
    const color = i === hightlight ? ' highlight' : ''
    return (
      <span className={'list-item' + color} key={i}>
        {item}
      </span>
    )
  })

  return <div className="display-list">{displayList}</div>
}
