import React from 'react'
import App from './App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { matchPath } from 'react-router-dom'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { UserService } from './api/UserAPI'
import { createStore } from './store'
import { Provider } from 'react-redux'

// Эта функция может быть скомпилирована для deploy в папку dist-ssr
// а может быть использована во время разработки в dev режиме
export async function render(url: string, UserAPI: any) {
  const store = createStore(new UserService(UserAPI))
  /* 
  const [pathname] = url.split('?')
  const currentRoute = routes.find(route => matchPath(pathname, route.path))
	if (currentRoute) {
		const { loader } = currentRoute
		if (loader) {
			await loader(store.dispatch)
		}
	}
*/
  const initialState = store.getState()
  // UserAPI.getUser()	// 'Cookie is not valid'

  const sheet = new ServerStyleSheet()
  const renderResult = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </StyleSheetManager>
  )
  const css = sheet.getStyleTags()

  sheet.seal()

  return [initialState, renderResult, css]
}
