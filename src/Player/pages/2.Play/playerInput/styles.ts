import { css, styled } from 'styled-components'

export const InputFieldContainer = styled.div`
  /* border: 1px solid black; */
  border-radius: 0.2rem;
  background: var(--input-color);
  padding: 0.5em;
  color: black;
  font-size: 0.9em;
`

export const WriteWordField = styled.input`
  font-size: 1em;
  margin: 0.3em;
  width: 10em;

  display: inline-block;
  border: none;
  text-decoration: none;
  background: var(--input-color);
  padding: 0.5em;
  border-radius: 0.2rem;

  &:active {
    background-color: #cccccc;
  }

  &:focus {
    outline-style: solid;
    outline-color: transparent;
    box-shadow: 0 0 0 0.2rem darkgray;
  }
`
export interface SquareProps {
  firstInRow?: boolean
  empty?: boolean
  highlight?: boolean
  topRow?: boolean
  highlightSquare?: boolean
}

export const InputAnswer = styled.input<SquareProps>`
  width: 100%;
  height: 100%;
  border: none;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  ${(props) =>
    props.highlightSquare &&
    css`
      color: black;
      background: #efefef;
      border-radius: 0.2rem;
    `}
`
