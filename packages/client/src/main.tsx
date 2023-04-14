import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { startServiceWorker } from './utils/startServiceWorker.mjs'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
if (import.meta.env.PROD) startServiceWorker()
