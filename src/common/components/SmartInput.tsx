import React, { FunctionComponent } from 'react'

interface SmartInputProps {
  onChange: (stringValue: string) => void
  placeholder?: string
}

export const SmartInput: FunctionComponent<SmartInputProps> = ({
  onChange,
  placeholder = '...',
}) => {
  return (
    <input
      className="smart-input"
      type="text"
      placeholder={placeholder}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.value)}
    />
  )
}
