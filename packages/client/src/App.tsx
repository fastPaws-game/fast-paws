import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { Routes, Route, RouterProvider } from 'react-router-dom'
import RequireAuth from './modules/authModule/RequireAuth'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'
import { router } from './main'

function App() {
  const { theme, themeToggler } = useChangeTheme()

  return (
    
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <button onClick={themeToggler}>Toggle Theme</button>
        <RouterProvider router={router} />
      </ThemeProvider>

  )
}

export default App
