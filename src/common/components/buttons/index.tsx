export * from './styles'

import React, { FunctionComponent } from 'react'
import { GameButton } from './styles'

interface ButtonProps {
  onClick?: () => void
  children?: JSX.Element | string
}

export const Button: FunctionComponent<ButtonProps> = ({ onClick, children }) => {
  return (
    <GameButton className="button" onClick={onClick}>
      {children}
    </GameButton>
  )
}

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
