import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box_l, Cluster_l } from '../common/everyLayout'
import { PondrButton } from '../common/components/buttons'
import Maskot2 from '../assets/svg/maskot_2.svg'

import Headline from '../assets/svg/pondr.svg'

export const LandingPage: FunctionComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <div className="flex-1 flex items-center">
        <div>
          <Headline maxwidth="100%" height="3rem" />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center w-[100%]">
        <Box_l className=" max-w-[32rem]">
          <Cluster_l align="center" justify="center" className="text-[1.5rem]">
            <Link to="/room">
              <PondrButton width="8em">Create game</PondrButton>
            </Link>
            <Link to="/player">
              <PondrButton width="8em">Join game</PondrButton>
            </Link>
          </Cluster_l>
        </Box_l>
      </div>
      <div className="flex-1 flex items-center">
        <Maskot2 maxwidth="100%" height="10rem" />
      </div>
    </div>
  )
}

export default LandingPage
