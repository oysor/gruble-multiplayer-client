import React, { FunctionComponent } from 'react'

interface SubmitButtonProps {
  onClick: () => void
  value?: string
  disabled?: boolean
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  onClick,
  value = 'Submit',
  disabled,
}) => {
  return (
    <input
      className="submit-input"
      type="button"
      value={value}
      onClick={onClick}
      disabled={disabled}
    />
  )
}
