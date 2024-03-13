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

export const Button3D = styled.button`
  position: relative;
  background: transparent;

  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;

  transition: filter 600ms;

  & :hover {
    transition: filter 250ms;
    filter: brightness(110%);
  }

  :focus:not(:focus-visible) {
    outline: none;
  }
`
export const Front = styled.span`
  display: block;
  padding: 0.2em 0.8em;
  /* border-radius: 12px; */
  font-size: 1rem;

  background: hsl(0, 0%, 97%);
  color: black;
  transform: translateY(-4px);

  will-change: transform;
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);

  ${Button3D}:hover & {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  ${Button3D}:active & {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > svg {
    margin-right: 0.5em;
  }
`

export const Egde = styled.span`
  ${Button3D} & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;

    background: linear-gradient(
      to left,
      hsl(0, 0%, 60%) 0%,
      hsl(0, 0%, 80%) 8%,
      hsl(0, 0%, 80%) 92%,
      hsl(0, 0%, 60%) 100%
    );
  }
`

export const Shadow = styled.span`
  ${Button3D} & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    filter: blur(4px);
    transform: translateY(2px);
  }

  ${Button3D}:hover & {
    transform: translateY(4px);
  }
  ${Button3D}:active & {
    transform: translateY(1px);
    transition: transform 34ms;
  }
`

export const GameButton = styled.button`
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
  font-size: 1.2rem;

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
