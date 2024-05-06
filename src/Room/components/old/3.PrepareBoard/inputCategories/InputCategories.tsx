import React, { FunctionComponent } from 'react'
import * as S from './styles'

type InputCategoriesProps = {
  setInputList: (inputList: string[]) => void
  inputList: string[]
}

export const InputCategories: FunctionComponent<InputCategoriesProps> = ({
  inputList,
  setInputList,
}) => {
  // handle input change
  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = ev.target
    const list = [...inputList]
    list[index] = value
    setInputList(list)
  }

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, ''])
  }

  return (
    <S.InputCategories>
      {inputList.map((x, i) => {
        return (
          <S.InputCategory key={i}>
            <S.RemoveCategory
              disabled={inputList.length === 1}
              onClick={() => handleRemoveClick(i)}
            >
              -
            </S.RemoveCategory>
            <S.WriteCategory
              value={x}
              placeholder={'category..'}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(ev, i)
              }
            />
          </S.InputCategory>
        )
      })}
      <S.AddCategory onClick={handleAddClick}>+</S.AddCategory>
    </S.InputCategories>
  )
}
