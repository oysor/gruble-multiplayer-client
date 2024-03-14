import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box_l, Center_l, Cluster_l, Cover_l, Stack_l } from '../common/everyLayout'
import { GameButton } from '../common/components/buttons'
import Maskot from '../assets/svg/maskot.svg'

export const LandingPage: FunctionComponent = () => {
  return (
    <Cover_l centered="div">
      <Center_l gutters="2rem">
        <Stack_l space="1rem" className="items-center">
          <Maskot maxwidth="100%" height="100%" />
          <Box_l>
            <Cluster_l align="center" justify="center">
              <Link to="/room">
                <GameButton> Game room </GameButton>
              </Link>
              <Link to="/player">
                <GameButton>Player room</GameButton>
              </Link>
            </Cluster_l>
          </Box_l>
        </Stack_l>
      </Center_l>
    </Cover_l>
  )
}

export default LandingPage
