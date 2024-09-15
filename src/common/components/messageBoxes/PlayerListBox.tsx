import React, { FunctionComponent } from 'react'
import { Player } from '../../constants'
import { styled } from 'styled-components'
import { Stack_l } from '../../everyLayout'
import { TextBox } from './TextBox'

type PlayerListBoxProps = {
  playerList: Player[]
}

interface InfoProps {
  color?: string
}

export const PlayerInfo = styled.span<InfoProps>`
  color: ${(props) => props.color};
  text-align: center;
`

export const PlayerListBox: FunctionComponent<PlayerListBoxProps> = ({ playerList }) => {
  return (
    <Stack_l space="0.3rem" className='text-center w-[100%] max-w-[22rem]'>
      <span className="text-sm text-center opacity-50">Players</span>
      <TextBox >
        {playerList.length > 0 ? (
          playerList.map(function (player, idx) {
            return (
              <PlayerInfo key={idx} color={player.color}>
                {player.name}
              </PlayerInfo>
            )
          })
        ) : (
          <span className="text-slate-800">{'Waiting for someone to join...'}</span>
        )}
      </TextBox>
    </Stack_l>
  )
}
