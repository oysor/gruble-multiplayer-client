import React, { useState } from 'react'
import { Cluster_l, Stack_l } from '../../../common/everyLayout'
import { Headline, UnderHeadline } from './styles'
import { updateTimeLimit } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { PondrNumericInput } from '../../../common/components/inputs/SmartNumericInput'
import { RoomState } from '../../store'
import Maskot2 from '../../../assets/svg/maskot_2.svg'
import { TimerSettings } from '../../../common/constants'

export const TimeInput = () => {
  const dispatch = useAppDispatch()
  // in seconds
  const { timeLimit } = useAppSelector((state: RoomState) => state.room)
  // in minutes
  const [time, setTime] = useState(timeLimit / 60)

  const littleTime = TimerSettings.LitteTime
  const plentyTime = TimerSettings.PlentyTime

  let message =
    'Set time! Usually anywhere between ' +
    littleTime +
    ' and ' +
    plentyTime +
    ' minutes is a good start.'

  if (time >= littleTime && time <= plentyTime) {
    message = 'Great! ' + time + ' minutes is perfect! Move on to the next step.'
  } else if (time > 0 && time < littleTime) {
    message = ' You must be in a hurry! Move on to the next step.'
  } else if (time > plentyTime) {
    message = time + ' is plenty of time! Move on to the next step.'
  }

  const handleTimeBlur = (): void => {
    if (time !== timeLimit) {
      const timeInSeconds = time * 60
      dispatch(updateTimeLimit(timeInSeconds))
    }
  }

  return (
    <div className="flex flex-col h-[100%] justify-around">
      <Stack_l className="text-center h-[1rem]">
        <Headline>Time</Headline>
        <UnderHeadline className="self-center text-center max-w-[13em]">
          {message}
        </UnderHeadline>
      </Stack_l>
      <Cluster_l space="0.3em" justify="center" className="mt-[6rem]">
        <PondrNumericInput
          onChange={setTime}
          onBlur={handleTimeBlur}
          value={time === 0 ? '' : time}
          placeholder="0"
          className="w-[2em]"
        />
        <span className="pb-[0.3em]">minutes</span>
      </Cluster_l>

      {<Maskot2 maxwidth="100%" height="10rem" />}
    </div>
  )
}
