import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box_l, Center_l, Cluster_l, Cover_l, Stack_l } from '../common/everyLayout'
import { GameButton, PondrButton } from '../common/components/buttons'
import Maskot from '../assets/svg/maskot.svg'

export const LandingPage: FunctionComponent = () => {
  return (
    <Cover_l centered="div">
      <Center_l gutters="2rem">
        <Box_l className="max-w-[32rem]">
          <Stack_l space="1rem" className="items-center">
            <Maskot maxwidth="100%" height="100%" />
            <Cluster_l align="center" justify="center">
              <Link to="/room">
                <PondrButton>Create game</PondrButton>
              </Link>
              <Link to="/player">
                <PondrButton>Join game</PondrButton>
              </Link>
            </Cluster_l>
          </Stack_l>
        </Box_l>
      </Center_l>
    </Cover_l>
  )
}

export default LandingPage
