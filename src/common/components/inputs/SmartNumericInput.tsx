import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'

interface SmartNumericInputProps {
  onChange: (value: number) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  onBlur?: (number: number) => void
  value?: number | string
  className?: string
  placeholder?: string
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

export const TransparentNumericInput = styled.input`
  display: inline-block;
  font-size: 1em;
  text-align: center;
  text-decoration: none;
  padding-bottom: 0.2em;
  margin: 0;
  border: 0;
  outline: none;
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;

  border: none;

  color: var(--btnColor);
  background-color: transparent;
  border-bottom: 0.1em solid white;
  font-family: var(--font-regular);

  &:focus {
    border-color: var(--pondr-pink);
    caret-color: var(--pondr-pink);
  }
`

export const PondrNumericInput: FunctionComponent<SmartNumericInputProps> = ({
  onChange,
  onBlur,
  placeholder = '0',
  value,
  className = '',
}) => {
  return (
    <TransparentNumericInput
      className={className}
      type="number"
      value={value}
      placeholder={placeholder}
      step="1"
      min="0"
      max="99"
      onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
        const numericInput = parseInt(ev.target.value)
        const isNumber = !isNaN(numericInput)
        if (isNumber) {
          onChange(numericInput)
        }
      }}
      onBlur={(ev: React.ChangeEvent<HTMLInputElement>) => {
        const numericInput = parseInt(ev.target.value)
        const isNumber = !isNaN(numericInput)
        if (isNumber) {
          if (onBlur) {
            onBlur(numericInput)
          }
        }
      }}
    />
  )
}
