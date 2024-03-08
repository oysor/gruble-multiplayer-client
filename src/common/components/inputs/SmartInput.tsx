import React, { FunctionComponent } from 'react'

interface SmartInputProps {
  onChange: (stringValue: string) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  placeholder?: string
  value?: string
  disabled?: boolean
}

export const SmartInput: FunctionComponent<SmartInputProps> = ({
  onChange,
  onKeyPress = (e) => e.key === 'Enter' && e.preventDefault(),
  placeholder = '...',
  value,
  disabled = false,
}) => {
  return (
    <input
      disabled={disabled}
      className="smart-input"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.value)}
      onKeyPress={(e) => onKeyPress(e)}
    />
  )
}
