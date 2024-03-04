import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Center_l,
  Cluster_l,
  Cover_l,
  Stack_l,
} from '../../common/styledComponents/everyLayout'
import { GameButton } from '../../common/components/Button'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Maskot from '../../svg/maskot.svg'

export const LandingPage: FunctionComponent = () => {
  return (
    <Cover_l centered="div">
      <Center_l intrinsic>
        <Stack_l space="1rem" className="items-center">
          <Maskot width="200" height="200" />
          <Cluster_l align="center" justify="center">
            <Link to="/room">
              <GameButton> Game room </GameButton>
            </Link>
            <Link to="/player">
              <GameButton>Player room</GameButton>
            </Link>
          </Cluster_l>
        </Stack_l>
      </Center_l>
    </Cover_l>
  )
}

export default LandingPage
