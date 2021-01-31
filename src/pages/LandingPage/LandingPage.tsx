import React, { FunctionComponent } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const LandingPage: FunctionComponent = () => {
  const location = useLocation()

  return String(location.pathname) !== '/' ? null : (
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
