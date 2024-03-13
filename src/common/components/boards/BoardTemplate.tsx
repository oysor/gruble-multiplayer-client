import React, { FunctionComponent } from 'react'
import { Box_l } from '../../../common/everyLayout'
import { Board, InfoSquare, Row, Square } from '../../../common/components/boards/styles'

type BoardTemplatesProps = {
  categoryList: string[]
  letterList: string[]
}

export const BoardTemplate: FunctionComponent<BoardTemplatesProps> = ({
  categoryList,
  letterList,
}) => {
  return (
    <Box_l className="overflow-x-scroll">
      <Board backgroundColor="#c4c4c4">
        <Row>
          <Square firstInRow>
            <InfoSquare>
              <span>{'Categories '}&rarr;</span>
              <span>{'Letters '}&darr;</span>
            </InfoSquare>
          </Square>
          {categoryList.map((category, c) => {
            return (
              <Square empty key={c}>
                {category}
              </Square>
            )
          })}
        </Row>
        {letterList.map((letter, l) => {
          return (
            <Row key={l}>
              <Square empty firstInRow>
                {letter.toUpperCase()}
              </Square>
              {categoryList.map((x, c) => {
                return (
                  <Square empty key={c}>
                    <span>-</span>
                  </Square>
                )
              })}
            </Row>
          )
        })}
      </Board>
    </Box_l>
  )
}
