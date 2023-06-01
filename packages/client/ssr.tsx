import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { Provider } from 'react-redux'
import { createStore } from './src/store'
import { GlobalStyles } from './src/assets/styles/globalStyle'
import { routes } from './src/router/routes'
import { matchPath } from 'react-router'
import { UserRepository, UserService } from './src/services/userService'
import { ThemeVariants, setTheme } from './src/store/theme/ThemeSlice'
import StartSSRPage from './src/pages/StartSSRPage'

export async function render(url: string, repository: UserRepository, currentTheme: ThemeVariants) {
  const [pathname] = url.split('?')

  const currentRoute = routes.find(route => matchPath(pathname, route.path))
  const { store } = createStore(new UserService(repository))

  if (currentRoute) {
    const { loader } = currentRoute
    if (loader) {
      await loader(store.dispatch)
    }
  }
  if (currentTheme) store.dispatch(setTheme(currentTheme))

  const initialState = store.getState()

  const sheet = new ServerStyleSheet()

  const markupHTML = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={url}>
        <Provider store={store}>
          <GlobalStyles />
          <StartSSRPage />
        </Provider>
      </StaticRouter>
    </StyleSheetManager>
  )
  const css = sheet.getStyleTags()

  sheet.seal()

  return [initialState, markupHTML, css]
}
