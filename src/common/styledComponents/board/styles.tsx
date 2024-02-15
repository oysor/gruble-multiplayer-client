import styled, { css } from 'styled-components'

export interface SquareProps {
  firstInRow?: boolean
  empty?: boolean
}

export const Board = styled.div`
  display: flex;
  flex-direction: column;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Square = styled.div<SquareProps>`
  flex: 2;
  min-height: 4rem;
  width: max-content;

  overflow: hidden;

  background: #efefef;
  border: 1px solid #333;

  ${(props) =>
    props.firstInRow &&
    css`
      flex: 1;
      min-width: 7rem;
    `}

  ${(props) =>
    props.empty &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`

export const InputCategory = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1.1rem;
`
export const InputLetter = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1.1rem;
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
