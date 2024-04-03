import { css, styled } from 'styled-components'

type ButtonStyleProps = {
  highlight?: boolean
}

export const StyledButton = styled.button<ButtonStyleProps>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // border: none;
  border: 1px solid black;
  font-family: inherit;
  font-size: 1.2em;
  cursor: pointer;

  color: black;
  /* border-radius: 16px; */
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.18);

  padding: 0.25em 0.75em;
  min-width: 10ch;
  min-height: 44px;

  text-align: center;
  line-height: 1.1;

  &:hover,
  &:active {
    background-color: scale-color($btnColor, $lightness: -20%);
  }

  transition: 220ms all ease-in-out;

  &:focus {
    outline-style: solid;
    outline-color: transparent;
    box-shadow: 0 0 0 4px scale-color($btnColor, $lightness: -40%);
  }

  ${(props) =>
    props.highlight &&
    css`
      font-size: x-large;
      /* border: 1px solid black; */
      color: black;
    `}
`

export const StyledSubmit = styled.input`
  position: relative;
  display: inline-block;
  padding: 1em 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  border-radius: 0.2rem;
  color: black;
  background: #f9b;
  /* box-shadow: 2px 2px #ed6b97,6px 6px black; */
  line-height: 1.2em;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
    background-color: #f7adc6;
  }

  &:active {
    transform: translate(6px, 6px);
    transition: all 10ms linear;
    box-shadow:
      0px 0px lightpink,
      0px 0px black;
  }
`

interface GameButtonProps {
  valid?: boolean
}

export const GameButton = styled.button<GameButtonProps>`
  position: relative;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  border-radius: 0.2rem;
  color: black;
  background: #f9b;
  box-shadow:
    2px 2px #ed6b97,
    6px 6px black;
  line-height: 1.2em;
  text-align: center;
  font-weight: bold;
  font-size: 1em;

  ${(props) =>
    !props.valid &&
    css`
      &:hover {
        background-color: #f7adc6;
      }

      &:active {
        transform: translate(6px, 6px);
        transition: all 10ms linear;
        box-shadow:
          0px 0px lightpink,
          0px 0px black;
      }
    `}
`

interface PondrButtonProps {
  valid?: boolean
  color?: string
  background?: string
}

export const PondrButton = styled.button<PondrButtonProps>`
  position: relative;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  border-radius: var(--main-radius, 0rem);

  color: var(--main-color, '#035151');
  color: ${(props) => props.color && props.color};
  background: var(--btnColor, '#FFFFFF');
  background: ${(props) => props.background && props.background};

  font-family: var(--font-bold);
  text-align: center;
  /* font-weight: bold; */
  font-size: 1em;
  line-height: 1.2em;

  ${(props) =>
    !props.valid &&
    css`
      &:hover {
        background-color: #f7adc6;
      }
    `}
`
