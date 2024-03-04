import React from 'react'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

export const PlayerRow = ({ children }: Props) => {
  const squares = React.Children.map(children, (child, i) => {
    return (
      <div className="answer-square" key={i}>
        {child}
      </div>
    )
  })

  return <div className="answer-row">{squares}</div>
}
