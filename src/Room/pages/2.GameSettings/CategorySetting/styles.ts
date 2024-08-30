import { css, styled } from 'styled-components'

export const ShowOverlayButton = styled.button`
  width: 100%;

  display: flex;
  background-color: #27736c;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;
  appearance: none;

  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-style: dashed;

  padding: 0.8em;
  font-size: 1em;
  color: white;

  align-items: center;
  justify-content: center;
  touch-action: none;
  cursor: var(--cursor, pointer);

  padding-left: 1em;
  padding-right: 1em;
`

interface transformProps {
  move: boolean
}

export const OverLayList = styled.div<transformProps>`
  z-index: 1;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  overflow-y: scroll;

  transform: translateY(100%);
  transition: 0.3s transform linear;

  ${(props) =>
    props.move &&
    css`
      transform: translateY(0%);
      overflow: hidden;
    `}
`
