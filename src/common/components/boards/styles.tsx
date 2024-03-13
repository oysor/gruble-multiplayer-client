import styled, { css } from 'styled-components'

export interface SquareProps {
  firstInRow?: boolean
  empty?: boolean
  highlight?: boolean
  topRow?: boolean
  highlightSquare?: boolean
}
interface BoardProps {
  backgroundColor?: string
}

export const Board = styled.div<BoardProps>`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 1rem;
  padding: 0.5rem;
  background-color: ${(props) => props.backgroundColor || 'white'};
  color: black;
  width: fit-content;
  border-radius: 0.2rem;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Square = styled.div<SquareProps>`
  min-height: 4rem;
  min-width: 7rem;
  flex-basis: 10rem;
  max-width: 10rem;

  ${(props) =>
    props.firstInRow &&
    css`
      max-width: 7rem;
    `}

  ${(props) =>
    props.highlight &&
    css`
      min-width: 5rem;
      font-size: x-large;
    `}

  ${(props) =>
    props.empty &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

  ${(props) =>
    props.highlightSquare &&
    css`
      color: black;
      background: #efefef;
      border-radius: 16px;
    `}
`

export const InputCategory = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1rem;
  min-width: 0;
  border: 0;
  text-decoration-line: underline;
  text-decoration-style: dotted;
`
export const InputLetter = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1rem;
  min-width: 0;
  border: 0;
  text-decoration-line: underline;
  text-decoration-style: dotted;
`
export const InfoSquare = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
  font-size: 0.8rem;

  & > :first-child {
    align-self: start;
  }

  & > :last-child {
    align-self: start;
  }
`
export interface SquareInputProps {
  highlight?: boolean
}

export const SquareInput = styled.span<SquareInputProps>`
  width: 100%;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.highlight &&
    css`
      font-size: x-large;
      font-size: 1.3rem;
    `}

  color:  ${(props) => props.color || null};
`
