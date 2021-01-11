import React, { FunctionComponent } from "react";
import "./App.css"
import { LandingPage } from './pages/LandingPage'

import { Room } from './pages/Room'
import { Player } from './pages/Player'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


const App: FunctionComponent = () => {
  return (
    <div className="App">
        <BrowserRouter>
          <LandingPage/>
          <Switch>
            <Route path="/room">
              <Room />
            </Route>
            <Route path="/player">
              <Player />
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

