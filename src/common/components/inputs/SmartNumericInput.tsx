import React, { FunctionComponent } from 'react'

interface SmartNumericInputProps {
  onChange: (value: number) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  value?: number
}

export const SmartNumericInput: FunctionComponent<SmartNumericInputProps> = ({
  onChange,
  onKeyPress = (e) => e.key === 'Enter' && e.preventDefault(),
  value = 10,
}) => {
  return (
    <input
      className="smart-numeric-input hover"
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
