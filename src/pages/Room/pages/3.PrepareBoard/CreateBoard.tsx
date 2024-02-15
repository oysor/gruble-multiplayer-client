import React, { FunctionComponent } from 'react'
import { Box_l } from '../../../../common/styledComponents/everyLayout'
import {
  Board,
  InfoSquare,
  InputCategory,
  InputLetter,
  Row,
  Square,
} from '../../../../common/styledComponents/board/styles'

type InputCategoriesProps = {
  setCategoryList: (inputList: string[]) => void
  categoryList: string[]
  setLetterList: (categoryList: string[]) => void
  letterList: string[]
}

export const CreateBoard: FunctionComponent<InputCategoriesProps> = ({
  categoryList,
  setCategoryList,
  letterList,
  setLetterList,
}) => {
  // handle input change
  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = ev.target
    const list = [...categoryList]
    list[index] = value
    setCategoryList(list)
  }

  // handle input change
  const handleLetterChange = (ev: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = ev.target
    const list = [...letterList]
    list[index] = value
    setLetterList(list)
  }

  return (
    <Box_l>
      <Board>
        <Row>
          <Square firstInRow>
            <InfoSquare>
              <span>{'Categories '}&rarr;</span>
              <span>{'Letters '}&darr;</span>
            </InfoSquare>
          </Square>
          {categoryList.map((x, i) => {
            return (
              <Square key={i}>
                <InputCategory
                  value={x}
                  placeholder={'category..'}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(ev, i)
                  }
                />
              </Square>
            )
          })}
        </Row>
        {categoryList.map((x, i) => {
          return (
            <Row key={i}>
              <Square firstInRow>
                <InputLetter
                  value={letterList[i].toLocaleUpperCase()}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    handleLetterChange(ev, i)
                  }
                />
              </Square>
              {categoryList.map((x, i) => {
                return (
                  <Square empty key={i}>
                    -
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
