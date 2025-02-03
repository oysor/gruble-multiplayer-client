import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'
import { Player } from '../../../../common/constants'
import { DisconnectTimer } from '../../../components/PlayerList/DisconnectTimer'
import Submitted_icon from '../../../../assets/svg/submit_successfully.svg'
import Not_submitted_icon from '../../../../assets/svg/not_submitted.svg'

interface InfoProps {
  faded?: boolean
}

interface PlayerRowProps {
  player: Player
}

const PlayerRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`

const PlayerRowName = styled.span<InfoProps>`
  opacity: ${(props) => props.faded && '0.5'};
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const PlayerStatusRow: FunctionComponent<PlayerRowProps> = ({ player }) => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10) // 10 minutes timer

  const { hasSubmitted, isDisconnected } = player
  // const hasSubmitted = false
  // const isDisconnected = true;

  return (
    <PlayerRow>
      <PlayerRowName faded={isDisconnected}>
        {hasSubmitted ? (
          <Submitted_icon maxwidth="100%" height="1rem" />
        ) : (
          <Not_submitted_icon maxwidth="100%" height="1rem" />
        )}
        {player.name}
      </PlayerRowName>
      {isDisconnected && <DisconnectTimer expiryTimestamp={time} player={player} />}
    </PlayerRow>
  )
}
