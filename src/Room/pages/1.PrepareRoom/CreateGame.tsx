import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../common/everyLayout'
import { Headline2, UnderHeadline } from './styles'
import { createRoom, setNextPage } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RoomState } from '../../store'

import Maskot2 from '../../../assets/svg/maskot_2.svg'
import { PondrButton } from '../../../common/components/buttons'

export const CreateRoom: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { roomName, timeLimit, boardSettings } = useAppSelector(
    (state: RoomState) => state.room
  )
  const { categories } = boardSettings
  const norskeAlfabetet = 'abcdefghijklmnopqrstuvwxyzøæå'.split('')

  const missingCategories = categories.length < 1

  const timeLimitInMinutes = timeLimit / 60

  const dispatchOnClick = () => {
    if (!missingCategories) {
      dispatch(
        createRoom({
          RoomName: roomName,
          TimeLimit: timeLimit,
          BoardSettings: {
            Categories: categories,
            Letters: norskeAlfabetet.slice(0, categories.length),
          },
        })
      ),
        dispatch(setNextPage())
    }
  }

  return (
    <div className="flex flex-col h-[100%]">
      <Stack_l className="text-center h-[6rem]">
        <Headline2>{roomName}</Headline2>
        <UnderHeadline className="self-center text-center">
          {missingCategories
            ? 'Go back and choose some categores!'
            : 'Let the games begin!'}
        </UnderHeadline>
      </Stack_l>
      <Stack_l space="1em" justify="center" align="center" className="h-[100%]">
        <Stack_l space="1em" className="max-w-[13em]">
          <Maskot2 maxwidth="100%" height="10rem" />
          <UnderHeadline className="self-center text-center">
            {timeLimitInMinutes + ' minutes'}
          </UnderHeadline>
          <UnderHeadline className="self-center text-center">
            {categories.join(', ')}
          </UnderHeadline>
        </Stack_l>
      </Stack_l>
      <div className="self-center">
        <PondrButton fontSize="1.5em" onClick={dispatchOnClick}>
          Create Game
        </PondrButton>
      </div>
    </div>
  )
}
