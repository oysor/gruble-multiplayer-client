import React, { FunctionComponent } from 'react'

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
    <div className="input-categories">
      {inputList.map((x, i) => {
        return (
          <div className="input-category" key={i}>
            <input
              className="write-category"
              value={x}
              placeholder={'category..'}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(ev, i)
              }
            />
            {inputList.length !== 1 && (
              <button onClick={() => handleRemoveClick(i)} className="remove-category">
                -
              </button>
            )}
            {inputList.length - 1 === i && (
              <button onClick={handleAddClick} className="add-category">
                +
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
