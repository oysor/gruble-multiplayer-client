import React, { FunctionComponent } from 'react'

export const PlayerRow: FunctionComponent = ({ children }) => {
  const squares = React.Children.map(children, (child, i) => {
    return (
      <div className="score-square" key={i}>
        {child}
      </div>
    )
  })

  return <div className="score-row">{squares}</div>
}
