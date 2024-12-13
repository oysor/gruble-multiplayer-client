import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  ClearInputButton,
  InputFieldContainer,
  MainInput,
  WriteWordField,
} from './styles'
import Clear from '../../../../assets/svg/clear_input_field.svg'
import { PondrButton } from '../../../../common/components/buttons'
import { Cluster_l, Stack_l } from '../../../../common/everyLayout'

interface InputBoardProps {
  word: string
  letter: string
  category: string
  addInput: (value: string) => void
  placeholder?: string
  showComponent: (value: boolean) => void
}

export const InputWord: FunctionComponent<InputBoardProps> = ({
  addInput,
  placeholder,
  word,
  letter,
  category,
  showComponent,
}) => {
  const text = placeholder !== undefined ? placeholder : 'word..'

  const [answer, setAnswer] = useState(word)

  useEffect(() => {
    setAnswer(word)
  }, [word])

  return (
    <Stack_l align="center" className="p-[0.5rem] pr-[1rem]">
      <MainInput>
        <span>{letter}</span>
        <Stack_l>
          <span>{category}</span>

          <InputFieldContainer>
            <WriteWordField
              autoFocus={true}
              value={answer}
              placeholder={text}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                setAnswer(ev.target.value)
              }}
            />
            <div className="w-[2.3rem]">
              {answer !== '' && (
                <ClearInputButton onClick={() => setAnswer('')}>
                  <Clear />
                </ClearInputButton>
              )}
            </div>
          </InputFieldContainer>
        </Stack_l>
      </MainInput>
      <Cluster_l space="1rem" justify="center" className="mt-[2rem]">
        <PondrButton onClick={() => showComponent(false)}>Cancel</PondrButton>
        <PondrButton
          onClick={() => {
            addInput(answer)
            showComponent(false)
          }}
        >
          Enter
        </PondrButton>
      </Cluster_l>
    </Stack_l>
  )
}
