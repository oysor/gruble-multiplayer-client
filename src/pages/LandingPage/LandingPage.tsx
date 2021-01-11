import React, { FunctionComponent } from "react";
import { Link, useLocation } from 'react-router-dom';

export const LandingPage: FunctionComponent = () => {

  const location = useLocation();

  return String(location.pathname) !== '/' ? null : (
    <div className="landing-page">
      <Link to="/room">
        <button>
          Game room
        </button >
      </Link>
      <Link to="/player">
        <button>
          Player room
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;