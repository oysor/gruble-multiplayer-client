import React, { FunctionComponent } from 'react'
import { InputFieldContainer, WriteWordField } from './styles'

interface InputBoardProps {
  word: string
  onInput: (ev: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export const InputWord: FunctionComponent<InputBoardProps> = ({
  onInput,
  placeholder,
  word,
}) => {
  const text = placeholder !== undefined ? placeholder : 'word..'

  return (
    <InputFieldContainer>
      <WriteWordField
        value={word}
        placeholder={text}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onInput(ev)}
      />
    </InputFieldContainer>
  )
}
