import React, { FunctionComponent, Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
// import LoadingPage from './common/components/Loading'

function shouldForwardProp(propName: string, target: unknown) {
  if (typeof target === 'string') {
    return isPropValid(propName)
  }
  return true
}

const LandingPage = lazy(() =>
  import('./pages/LandingPage').then(({ LandingPage }) => ({ default: LandingPage }))
)

const Player = lazy(() =>
  import('./pages/Player').then(({ Player }) => ({ default: Player }))
)
const Room = lazy(() => import('./pages/Room').then(({ Room }) => ({ default: Room })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={''}>
        <LandingPage />
      </Suspense>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/room',
    element: (
      <Suspense fallback={''}>
        <Room />
      </Suspense>
    ),
    children: [
      {
        path: '/room/:roomId',
        element: <Room />,
      },
    ],
  },

  {
    path: '/player',
    element: (
      <Suspense fallback={''}>
        <Player />
      </Suspense>
    ),
  },
])

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <RouterProvider router={router} />
      </StyleSheetManager>
    </div>
  )
}

export default App
