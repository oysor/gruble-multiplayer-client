import { styled } from "styled-components"

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