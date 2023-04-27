import React from 'react'
import App from './App'
import { renderToString } from 'react-dom/server'

export function render(url: string) {
  return renderToString(
    // <StaticRouter location={url}>
    <App />
  )
}
