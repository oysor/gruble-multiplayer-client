import React, { FunctionComponent } from 'react'
import { Box_l, Stack_l } from '../../../common/everyLayout'
import Maskot from '../../../assets/svg/maskot.svg'

export const Introduction: FunctionComponent = ({}) => {
  return (
    <div id="play">
      <Box_l>
        <Stack_l space="0.3rem" className="mb-[2rem]">
          <Maskot width="4rem" height="100%" />
          <Stack_l space="0.5rem" className="text-sm">
            <div>Ok, stupid! </div>
            <div>You will receive a board to fill out with words.</div>
            <div>
              Each word must be within their category and start with the correct letter.
            </div>
            <div>
              One extra point if you write down a word that no one else wrote down.
            </div>
            <div>You will have limited time to figure it out.</div>
          </Stack_l>
        </Stack_l>
      </Box_l>
    </div>
  )
}
