import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { startServiceWorker } from './utils/startServiceWorker.mjs'
import createStore from './store'
import { Provider } from 'react-redux'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'

const initialState = window.__REDUX_STATE__
delete window.__REDUX_STATE__
console.log('REDUX_STATE:', initialState)

// const store1 = createStore(new UserService(new UserAPI()), initialState)
export const { store } = createStore(initialState)

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
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
