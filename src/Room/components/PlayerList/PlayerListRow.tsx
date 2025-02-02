import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'
import { Player } from '../../../common/constants'
import { DisconnectTimer } from './DisconnectTimer'

interface InfoProps {
  faded?: boolean
  color?: string
}

interface PlayerRowProps {
  player: Player
}

export const StyledPlayerRow = styled.span<InfoProps>`
  color: ${(props) => props.color};
  opacity: ${(props) => props.faded && '0.5'};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

export const PlayerInfo = styled.span<InfoProps>`
  color: ${(props) => props.color};
  opacity: ${(props) => props.faded && '0.5'};
  text-align: center;
`

export const PlayerListRow: FunctionComponent<PlayerRowProps> = ({ player }) => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10) // 10 minutes timer
  const isDisconnected = true
  // const { isDisconnected } = player

  return (
    <StyledPlayerRow>
      <PlayerInfo faded={isDisconnected}>{player.name} </PlayerInfo>
      {isDisconnected && <DisconnectTimer expiryTimestamp={time} player={player} />}
    </StyledPlayerRow>
  )
}
