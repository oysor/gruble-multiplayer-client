export * from './styles'
import React, { FunctionComponent } from 'react'
import { GameButton, StyledSubmit } from './styles'

interface ButtonProps {
  onClick?: () => void
  children?: JSX.Element | string
  valid?: boolean
}

export const Button: FunctionComponent<ButtonProps> = ({ onClick, children, valid }) => {
  return (
    <GameButton valid={valid} onClick={onClick}>
      {children}
    </GameButton>
  )
}

interface SubmitButtonProps {
  onClick: () => void
  value?: string
  disabled?: boolean
  className?: string
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  onClick,
  value = 'Submit',
  disabled = false,
  className = '',
}) => {
  const hoverColor = !disabled && 'hover'
  return (
    <StyledSubmit
      className={className + ' ' + hoverColor}
      type="button"
      value={value}
      onClick={onClick}
      disabled={disabled}
    />
  )
}
