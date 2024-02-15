import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Center_l, Cover_l, Stack_l } from '../../common/styledComponents/everyLayout'

export const LandingPage: FunctionComponent = () => {
  return (
    <Cover_l centered="div">
      <Center_l intrinsic>
        <Stack_l space="5rem">
          <Link to="/room" className="router-link">
            Game room
          </Link>
          <Link to="/player" className="router-link">
            Player room
          </Link>
        </Stack_l>
      </Center_l>
    </Cover_l>
  )
}

export default LandingPage
