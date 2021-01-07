import React, { FunctionComponent} from "react";
import { Link, useLocation} from 'react-router-dom';

import {startRoomConnection} from '../Room/roomStore'
import {startPlayerConnection} from '../Player/playerStore'


export const LandingPage: FunctionComponent = () => {

  const location =  useLocation();
        
  return String(location.pathname) !== '/' ? null : (
      <div className="landing-page">
          <Link to="/room">
            <button 
              onClick={() => {
                startRoomConnection()
              }}
            >
              Game room
            </button ></Link>
          <Link to="/player">
            <button  
              onClick={() => {
                startPlayerConnection()
                }}
            >Player room</button></Link>
      </div>
  );
}

export default LandingPage;