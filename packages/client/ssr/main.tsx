import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import { startServiceWorker } from '../src/utils/startServiceWorker.mjs'
// import { store } from '../src/store'
// import { Provider } from 'react-redux'

// const store = createStore(window.__REDUX_STATE__)
// delete window.__REDUX_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>
)
// if (import.meta.env.PROD) startServiceWorker()
