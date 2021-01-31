import React, { FunctionComponent } from 'react'

interface SmartNumericInputProps {
  onChange: (value: number) => void
  value?: number
}

export const SmartNumericInput: FunctionComponent<SmartNumericInputProps> = ({
  onChange,
  value = 10,
}) => {
  return (
    <input
      className="smart-numeric-input"
      type="number"
      value={value}
      step="any"
      onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
        onChange(parseInt(ev.target.value))
      }
    />
  )
}
