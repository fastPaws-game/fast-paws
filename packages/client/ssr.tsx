import App from './src/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { Provider } from 'react-redux'
import { createStore } from './src/store'
import { GlobalStyles } from './src/assets/styles/globalStyle'
import { routes } from './src/router/routes'
import { matchPath } from 'react-router'
import { UserRepository, UserService } from './src/services/userService'

export async function render(url: string, repository: UserRepository) {
  const [pathname] = url.split('?')
  const currentRoute = routes.find(route => matchPath(pathname, route.path))
  const { store } = createStore(new UserService(repository))

  if (currentRoute) {
    const { loader } = currentRoute
    if (loader) {
      await loader(store.dispatch)
    }
  }

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

  return [markupHTML, css]
}
