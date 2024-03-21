import React, { FunctionComponent } from 'react'
import { Cluster_l } from '../../common/everyLayout'
import { Player } from '../../common/constants'
import { css, styled } from 'styled-components'

type DisplayList = {
  list: string[]
  hightlight?: number
  nextCategory: (i?: number) => void
}

export interface StyledWordList {
  highlight?: boolean
}

export const StyledWordList = styled.div``

export const WordListItem = styled.span<StyledWordList>`
  padding: 0.1rem;

  ${(props) =>
    props.highlight &&
    css`
      background: #eeecea;
      border-radius: 0.2em;
      color: black;
    `}
`

export const DisplayList: FunctionComponent<DisplayList> = ({
  list,
  hightlight,
  nextCategory,
}) => {
  return (
    <Cluster_l>
      {list.map((item, i) => {
        const current = i === hightlight
        return (
          <WordListItem highlight={current} key={i} onClick={() => nextCategory(i)}>
            {item}
          </WordListItem>
        )
      })}
    </Cluster_l>
  )
}
