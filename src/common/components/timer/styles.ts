import { styled } from 'styled-components'

export const BaseTimer = styled.div`
  position: relative;
  /* height: 300px;
  width: 300px; */
  height: 10em;
  width: 10em;
`

export const BaseTimer_svg = styled.svg``

export const BaseTimer_circle = styled.g`
  fill: none;
  stroke: none;
`

export const BaseTimer_pathElapsed = styled.circle`
  stroke-width: 7px;
  stroke: grey;
`

export const BaseTimer_label = styled.span`
  position: absolute;

  /* Size should match the parent container */
  /* width: 300px;
  height: 300px; */
  width: 100%;
  height: 100%;

  /* Keep the label aligned to the top */
  top: 0;

  /* Create a flexible box that centers content vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Sort of an arbitrary number; adjust to your liking */
  font-size: 2em;
`
interface TimeColorProps {
  color: string
}

export const BaseTimer_pathRemaining = styled.path<TimeColorProps>`
  /* Just as thick as the original ring */
  stroke-width: 7px;

  /* Rounds the line endings to create a seamless circle */
  stroke-linecap: round;

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;

  /* Allows the ring to change color when the color value updates */
  stroke: ${(props) => props.color};
`
