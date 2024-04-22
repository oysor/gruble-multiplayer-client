import React, { FunctionComponent } from 'react'
import { Box_l } from '../../../../common/everyLayout'
import {
  Board,
  InfoSquare,
  InputCategory,
  InputLetter,
  Row,
  Square,
} from '../../../../common/components/boards/styles'

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
    <Box_l className="overflow-x-scroll">
      <Board className="text-[60%]">
        <Row>
          <Square firstInRow>
            <InfoSquare>
              <span>{'Categories '}&rarr;</span>
              <span>{'Letters '}&darr;</span>
            </InfoSquare>
          </Square>
          {categoryList.map((category, c) => {
            return (
              <Square key={c}>
                <InputCategory
                  value={category}
                  placeholder={'category..'}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(ev, c)
                  }
                />
              </Square>
            )
          })}
        </Row>
        {letterList.map((x, l) => {
          return (
            <Row key={l}>
              <Square firstInRow>
                <InputLetter
                  value={letterList[l].toLocaleUpperCase()}
                  placeholder="letter.."
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    handleLetterChange(ev, l)
                  }
                />
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
