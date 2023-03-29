import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { useFetchServerData } from './hooks/useFetchServerData'
import { GlobalStyles } from './assets/styles/globalStyle'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'

function App() {
  const { theme, themeToggler } = useChangeTheme()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {/*<Router/>*/}
        <ProfilePage />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
