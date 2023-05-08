import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { startServiceWorker } from './utils/startServiceWorker.mjs'
import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './assets/styles/globalStyle'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
if (import.meta.env.PROD) startServiceWorker()
