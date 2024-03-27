import React from 'react'
import { FunctionComponent } from 'react'
import { Box_l, Center_l, Cover_l, Imposter_l } from '../../everyLayout'

export const GameClosed: FunctionComponent = () => {
  return (
    <Imposter_l className=" bg-[#03484f]/[.5] z-10 w-[100%]">
      <Cover_l centered="div">
        <Center_l intrinsic>
          <Box_l
            padding="3rem"
            backgroundColor="#c4c4c4"
            className="rounded-[0.2rem] w-fit"
          >
            {<div className="text-black font-[1000]">Game closed!</div>}
          </Box_l>
        </Center_l>
      </Cover_l>
    </Imposter_l>
  )
}
