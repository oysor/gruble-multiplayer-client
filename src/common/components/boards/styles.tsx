import styled, { css } from 'styled-components'

export interface SquareProps {
  firstInRow?: boolean
  empty?: boolean
  highlight?: boolean
  topRow?: boolean
  highlightOnInput?: boolean
  highlightOnClick?: boolean
  gotInput?: boolean
}
interface BoardProps {
  backgroundColor?: string
}

export const BoardContainer = styled.div<BoardProps>`
  display: flex;
`

export const Board = styled.div<BoardProps>`
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  padding: 0.5em;
  padding-bottom: 2em;
  background-color: ${(props) => props.backgroundColor || ''};
  color: black;
  border-radius: 0.2em;
  gap: 0.5em;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5em;
`

export const Square = styled.div<SquareProps>`
  min-height: 7em;
  min-width: 8em;
  flex-basis: 9em;
  max-width: 9em;
  background-color: #efefef;
  opacity: 0.5;
  outline: none;
  border-radius: 6px;

  ${(props) =>
    props.firstInRow &&
    css`
      background: none;
      flex-basis: 0em;
      min-width: 1rem;
      min-height: 1rem;
    `}

  ${(props) =>
    props.highlight &&
    css`
      font-weight: bolder;
    `}

  ${(props) =>
    props.empty &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
      min-height: 1rem;
      color: #0ae4e4;
      opacity: 1;
      font-family: Inter;
      font-weight: 700;
      font-size: 1em;
    `}

  ${(props) =>
    props.highlightOnClick &&
    css`
      color: black;
      opacity: 1;
    `}


  ${(props) =>
    props.highlightOnInput &&
    css`
      color: black;
      opacity: 1;
    `}
`

export const HeadingColumn = styled.span`
  font-size: 1.5em;
`
export const HeadingRow = styled.span`
  font-size: 1.5em;
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
      font-weight: bolder;
    `}

  color:  ${(props) => props.color || null};
`
