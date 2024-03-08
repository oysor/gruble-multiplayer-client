import React, { FunctionComponent, Suspense, lazy } from 'react'
import { NotFoundPage } from './NotFoundPage'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import LoadingPage from './common/components/Loading'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './LandingPage'

function shouldForwardProp(propName: string, target: unknown) {
  if (typeof target === 'string') {
    return isPropValid(propName)
  }
  return true
}

const Player = lazy(() => import('./Player').then(({ Player }) => ({ default: Player })))
const Room = lazy(() => import('./Room').then(({ Room }) => ({ default: Room })))

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <BrowserRouter>
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
        </BrowserRouter>
      </StyleSheetManager>
    </div>
  )
}

export default App
