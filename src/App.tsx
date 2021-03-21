import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LandingPage, Player, Room } from './pages'

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/room">
            <Room />
          </Route>
          <Route path="/player">
            <Player />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
