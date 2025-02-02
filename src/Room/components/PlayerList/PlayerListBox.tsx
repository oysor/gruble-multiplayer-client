import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'
import { Stack_l } from '../../../common/everyLayout'
import { TextBox } from '../../../common/components/messageBoxes/TextBox'
import { PlayerListRow } from './PlayerListRow'
import { Player } from '../../../common/constants'

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
    <Stack_l space="0.3rem" className="text-center w-[100%] max-w-[15rem]">
      <span className="text-sm text-center opacity-50">Players</span>
      <TextBox>
        {playerList.length > 0 ? (
          playerList.map(function (player, idx) {
            return <PlayerListRow key={idx} player={player} />
          })
        ) : (
          <span className="text-slate-800 text-xs">
            {'Waiting for someone to join...'}
          </span>
        )}
      </TextBox>
    </Stack_l>
  )
}
