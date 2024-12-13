import { css, styled } from 'styled-components'

export const MainInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #0ae4e4;
  font-family: Inter;
  & > span {
    margin-top: 1.4rem;
    margin-right: 0.5rem;
  }

  & > div > span {
    align-self: center;
    margin-bottom: 0.3rem;
  }
`

export const InputFieldContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  background: var(--input-color);
  color: black;
  font-size: 0.9em;
  background: white;
  width: 100%;
`

export const ClearInputButton = styled.button`
  background-color: transparent;
  border-width: 0;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: 0;
  padding: 0.5rem;
`

export const WriteWordField = styled.input`
  font-size: 1em;
  margin: 0.3em;
  width: 10em;
  width: inherit;
  display: inline-block;
  border: none;
  text-decoration: none;
  background: white;
  padding: 0.5em;
  background: none;
  outline: none;
`
export interface SquareProps {
  firstInRow?: boolean
  empty?: boolean
  highlight?: boolean
  topRow?: boolean
  highlightSquare?: boolean
}

export const InputAnswer = styled.div<SquareProps>`
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  outline: none;
  overflow: hidden;
  white-space: wrap;
  font-family: Inter;
  font-size: 1.2em;
  padding: 0.5em;
  display: flex;
  caret-color: transparent;

  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.highlightSquare &&
    css`
      color: black;
      border-radius: 0.2rem;
    `}
`

export const InputOverlay = styled.div`
  background-color: #ad310b;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #035151;
  z-index: 1;

  & > :first-child {
    transform: translate(0%, 120%);
  }
`
