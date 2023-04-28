import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from './store'
import { UserService, UserAPI } from './api/UserAPI'
import { StoreState } from './store'

declare global {
  interface Window {
    __REDUX_STATE__?: StoreState
  }
}

const initialState = window.__REDUX_STATE__
delete window.__REDUX_STATE__
console.log('REDUX_STATE:', initialState)

const store = createStore(new UserService(new UserAPI()), initialState)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
