import React, { FunctionComponent } from 'react'
import { ConnectionMode } from '../../constants'
import { styled } from 'styled-components'
import { Box_l } from '../../everyLayout'

type ButtonStyleProps = {
  color: string
}

const StyledStatus = styled.span<ButtonStyleProps>`
  color: ${(props) => props.color};
  font-size: 0.5rem;
`

interface ConnectionStatusProps {
  status: ConnectionMode
}

export const ConnectionStatus: FunctionComponent<ConnectionStatusProps> = ({
  status,
}) => {
  const connectionStatus = () => {
    switch (status) {
      case ConnectionMode.Connecting:
        return <StyledStatus color="grey">●</StyledStatus>
      // return <StyledStatus color="grey">Connecting...</StyledStatus>
      case ConnectionMode.Disconnected:
        return <StyledStatus color="black">●</StyledStatus>
      // return <StyledStatus color="black">Disconnected</StyledStatus>
      case ConnectionMode.Reconnecting:
        return <StyledStatus color="grey">●</StyledStatus>
      // return <StyledStatus color="grey">Reconnecting...</StyledStatus>
      case ConnectionMode.Connected:
        return <StyledStatus color="green">●</StyledStatus>
      // return <StyledStatus color="green">Connected</StyledStatus>
      case ConnectionMode.Failed:
        return <StyledStatus color="red">●</StyledStatus>
      // return <StyledStatus color="red">Connection Failed</StyledStatus>
    }
  }
  return (
    <Box_l padding="0.5rem" className="text-center z-10">
      {connectionStatus()}
    </Box_l>
  )
}
