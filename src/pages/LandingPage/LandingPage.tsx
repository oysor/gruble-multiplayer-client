import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import Styled from 'styled-components'

const Title = Styled.h1`
  color: red;
`
interface Props {}

export const LandingPage: FunctionComponent = ({}: Props) => {
  return (
    <div className="landing-page">
      <Link to="/room" className="router-link">
        <Title> Game room </Title>
      </Link>
      <Link to="/player" className="router-link">
        Player room
      </Link>
    </div>
  )
}

export default LandingPage
