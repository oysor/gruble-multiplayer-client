import React, { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LandingPage, Player, Room } from './pages'
import { NotFoundPage } from './pages/NotFoundPage'

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
      <RouterProvider router={router} />
    </div>
  )
}

export default App
