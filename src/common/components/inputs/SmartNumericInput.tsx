import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'

interface SmartNumericInputProps {
  onChange: (value: number) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  value?: number
  className?: string
}

export const StyledInput = styled.input`
  display: inline-block;
  border: none;
  font-size: 1em;
  text-align: center;
  text-decoration: none;
  background: $input-color;
  padding: 1rem 2rem;
  margin: 0;
  color: black;
  border: 1px solid black;
  background-color: white;
  border-radius: 0.2rem;
`

export const SmartNumericInput: FunctionComponent<SmartNumericInputProps> = ({
  onChange,
  onKeyPress = (e) => e.key === 'Enter' && e.preventDefault(),
  value = 10,
  className = '',
}) => {
  return (
    <StyledInput
      className={className + ' hover'}
      type="number"
      value={value}
      step="any"
      onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
        onChange(parseInt(ev.target.value))
      }
      onKeyPress={(e) => onKeyPress(e)}
    />
  )
}
