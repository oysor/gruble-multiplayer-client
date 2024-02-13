import React from 'react'
import App from './App'
import './scss/App.scss'

// import './css/app.css'

import { createRoot } from 'react-dom/client'

const container = document.getElementById('root') as HTMLElement

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
