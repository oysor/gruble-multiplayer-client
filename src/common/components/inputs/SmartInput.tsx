import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'

interface SmartInputProps {
  onChange: (stringValue: string) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  placeholder?: string
  value?: string
  disabled?: boolean
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

export const SmartInput: FunctionComponent<SmartInputProps> = ({
  onChange,
  onKeyPress = (e) => e.key === 'Enter' && e.preventDefault(),
  placeholder = '...',
  value,
  disabled = false,
  className = '',
}) => {
  return (
    <StyledInput
      disabled={disabled}
      className={className}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.value)}
      onKeyPress={(e) => onKeyPress(e)}
    />
  )
}
