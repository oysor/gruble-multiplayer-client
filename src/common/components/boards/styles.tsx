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
  /* margin: 1em; */
  /* margin-top: 0.3em; */
  padding: 0.5em;
  background-color: ${(props) => props.backgroundColor || 'white'};
  color: black;
  width: fit-content;
  border-radius: 0.2em;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Square = styled.div<SquareProps>`
  min-height: 4em;
  min-width: 5em;
  flex-basis: 10em;
  max-width: 10em;

  word-break: break-all;

  ${(props) =>
    props.firstInRow &&
    css`
      max-width: 7em;
    `}

  ${(props) =>
    props.highlight &&
    css`
      min-width: 5em;
      font-weight: bolder;
      /* font-size: 1.1em; */
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
      border-radius: 0.2rem;
    `}
`
interface InputProps {
  noStyle?: boolean
}

export const InputCategory = styled.input<InputProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1em;
  min-width: 0;
  border: 0;
  text-decoration-line: underline;
  text-decoration-style: dotted;

  ${(props) =>
    props.noStyle &&
    css`
      text-decoration-line: none;
      text-decoration-style: none;
      color: inherit;
    `}
`
export const InputLetter = styled.input<InputProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1em;
  min-width: 0;
  border: 0;
  text-decoration-line: underline;
  text-decoration-style: dotted;

  ${(props) =>
    props.noStyle &&
    css`
      text-decoration-line: none;
      text-decoration-style: none;
      color: inherit;
    `}
`
export const InfoSquare = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 0.5em;
  font-size: 0.8em;

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
      /* font-size: 1.3em; */
      font-weight: bolder;
    `}

  color:  ${(props) => props.color || null};
`
