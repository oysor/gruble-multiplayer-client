import React, { FunctionComponent } from 'react'
import { updateBoard } from '../../playerReducer'
import { useAppDispatch } from '../../playerHooks'
import { styled } from 'styled-components'

export const InputAnswers = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1.1rem;
`

interface InputSquareProps {
  board: string[][]
  coords: { x: number; y: number }
}

export const InputSquare: FunctionComponent<InputSquareProps> = ({ board, coords }) => {
  const dispatch = useAppDispatch()
  const { x, y } = coords

  // handle input change
  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    // deep copy array for every input
    const arr = [...Array(board.length)].map((a, i) => [...board[i]])
    arr[x][y] = value
    dispatch(updateBoard(arr))
  }

  return (
    <InputAnswers
      value={board[x][y]}
      className={'input-square'}
      type="text"
      placeholder={'...'}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onInput(ev)}
    />
  )
}
