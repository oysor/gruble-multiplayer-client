import React, { FunctionComponent } from 'react'

interface SubmitButtonProps {
  onClick: () => void
  value?: string
  disabled?: boolean
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  onClick,
  value = 'Submit',
  disabled = false,
}) => {
  const hoverColor = !disabled && 'hover'
  return (
    <input
      className={'submit-input ' + hoverColor}
      type="button"
      value={value}
      onClick={onClick}
      disabled={disabled}
    />
  )
}
