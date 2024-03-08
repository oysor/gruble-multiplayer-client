import React, { FunctionComponent, Suspense, lazy } from 'react'
import { NotFoundPage } from './NotFoundPage'

import LoadingPage from './common/components/Loading'
import { Routes, Route, HashRouter } from 'react-router-dom'
import { LandingPage } from './LandingPage'

const Player = lazy(() => import('./Player').then(({ Player }) => ({ default: Player })))
const Room = lazy(() => import('./Room').then(({ Room }) => ({ default: Room })))

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} errorElement={<NotFoundPage />} />
          <Route
            path="/player"
            element={
              <Suspense fallback={<LoadingPage />}>
                <Player />
              </Suspense>
            }
            errorElement={<NotFoundPage />}
          />
          <Route
            path="/room"
            element={
              <Suspense fallback={<LoadingPage />}>
                <Room />
              </Suspense>
            }
            errorElement={<NotFoundPage />}
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
