import React from 'react'
import App from './App'
import './css/main.css'
import './scss/App.scss'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root') as HTMLElement

const root = createRoot(container)

function shouldForwardProp(propName: string, target: unknown) {
  if (typeof target === 'string') {
    return isPropValid(propName)
  }
  return true
}

root.render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <App />
    </StyleSheetManager>
  </React.StrictMode>
)
