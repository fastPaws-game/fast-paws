import React from 'react'
import App from '../src/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { Provider } from 'react-redux'
import configureStore1 from '../src/store'
import { initialStore } from '../src/assets/mocks/storeMock'
import { GlobalStyles } from '../src/assets/styles/globalStyle'

// Эта функция может быть скомпилирована для deploy в папку dist-ssr
// а может быть использована во время разработки в dev режиме
export async function render(url: string, UserAPI: any) {
  // const store1 = createStore(new UserService(UserAPI))
  const { store } = configureStore1(initialStore)
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
  const markupHTML = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={url}>
        <Provider store={store}>
          <GlobalStyles />
          <App />
        </Provider>
      </StaticRouter>
    </StyleSheetManager>
  )
  const css = sheet.getStyleTags()

  sheet.seal()

  return [initialState, markupHTML, css]
}
