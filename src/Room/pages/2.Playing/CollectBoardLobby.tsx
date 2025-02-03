import React, { FunctionComponent } from 'react'
// import Maskot2 from '../../assets/svg/Brainy_thumbs_up.svg'
import { styled } from 'styled-components'
import { Stack_l } from '../../../common/everyLayout'
import { InfoText1 } from '../../../common/components'
import { useAppSelector } from '../../hooks'
import { RoomState } from '../../store'
import { PlayerStatusBox } from './PlayerStatusBox'

export const Headline = styled.div`
  font-family: var(--font-medium);
  font-size: 2em;
`

export const CollectBoardLobby: FunctionComponent = () => {
  const { playerList } = useAppSelector((state: RoomState) => state.room)

  return (
    <div id="lobby" className="flex flex-col h-[100%] w-[100%]">
      <Stack_l className="text-center h-[6rem]">
        <Headline>Round ended</Headline>
        <InfoText1 className="self-center text-center">
          Waiting on player boards..
        </InfoText1>
      </Stack_l>
      <Stack_l space="1em" justify="end" align="center" className="h-[100%]">
        <PlayerStatusBox playerList={playerList} />
      </Stack_l>
    </div>
  )
}
