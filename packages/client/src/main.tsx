import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { startServiceWorker } from './utils/startServiceWorker.mjs'
import { createStore } from './store'
import { Provider } from 'react-redux'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import { UserAPI } from './api/UserApi'
import { UserService } from './services/userService'
import isServer from './utils/isServerChecker'

const initialState = window.initialState

export const { store } = createStore(new UserService(new UserAPI()), initialState)

delete window.initialState

const initialChildren = (
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
const container = document.getElementById('root') as HTMLElement

if (isServer) {
  ReactDOM.hydrateRoot(container, initialChildren)
} else {
  ReactDOM.createRoot(container).render(initialChildren)
}

if (import.meta.env.PROD) startServiceWorker()
