import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

export const LandingPage: FunctionComponent = () => {
  return (
    <div className="landing-page">
      <Link to="/room" className="router-link">
        Game room
      </Link>
      <Link to="/player" className="router-link">
        Player room
      </Link>
    </div>
  )
}

export default LandingPage
