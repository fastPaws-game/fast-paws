import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import AuthController from './modules/authModule/authController'
// import NotFoundPage from './pages/NotFoundPage'


function App() {
  const { theme, themeToggler } = useChangeTheme()

  const logout = () => {
    AuthController.logout()
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <button onClick={themeToggler}>Toggle Theme</button>
        <button onClick={logout}>Logout</button>
        {/*<Router/>*/}
        <AuthPage />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
