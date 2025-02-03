import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../../common/everyLayout'
import { MessageBox, Messages } from '../../../../common/components/messageBoxes/TextBox'
import { Player } from '../../../../common/constants'
import { PlayerStatusRow } from './PlayerStatusRow'

type PlayerListBoxProps = {
  playerList: Player[]
}

export const PlayerStatusBox: FunctionComponent<PlayerListBoxProps> = ({
  playerList,
}) => {
  return (
    <Stack_l space="0.3rem" className="text-center w-[100%] max-w-[15rem]">
      <span className="text-sm text-center opacity-50">Players</span>
      <MessageBox>
        <Messages fullWidth>
          {playerList.length > 0 ? (
            playerList.map(function (player, idx) {
              return <PlayerStatusRow key={idx} player={player} />
            })
          ) : (
            <span className="text-slate-800 text-xs">
              {'Waiting for someone to join...'}
            </span>
          )}
        </Messages>
      </MessageBox>
    </Stack_l>
  )
}
