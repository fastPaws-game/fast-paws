import React from 'react'
import App from './App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
// import { store } from '../src/store';
// import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

// Эта функция может быть скомпилирована для deploy в папку dist-ssr
// а может быть использована во время разработки в dev режиме
export async function render(uri: string, UserAPI: any) {
  // await store.dispatch(userData);
  const sheet = new ServerStyleSheet()
  const initialState = {} //store.getState();
	// UserAPI.getUser()	// 'Cookie is not valid'

  const renderResult = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={uri}>
        {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
      </StaticRouter>
    </StyleSheetManager>
  )
  const css = sheet.getStyleTags()

  sheet.seal()

  return [initialState, renderResult, css]
}
