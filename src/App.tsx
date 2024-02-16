import React, { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LandingPage, Player, Room } from './pages'
import { NotFoundPage } from './pages/NotFoundPage'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

function shouldForwardProp(propName: string, target: unknown) {
  if (typeof target === 'string') {
    return isPropValid(propName)
  }
  return true
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/room',
    element: <Room />,
    children: [
      {
        path: '/room/:roomId',
        element: <Room />,
      },
    ],
  },

  {
    path: '/player',
    element: <Player />,
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
