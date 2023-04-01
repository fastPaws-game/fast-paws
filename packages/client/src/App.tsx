import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { useFetchServerData } from './hooks/useFetchServerData'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'


function App() {
  const { theme, themeToggler } = useChangeTheme()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {/*<Router/>*/}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
