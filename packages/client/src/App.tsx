import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from './modules/authModule/RequireAuth'
import AuthPage from './pages/AuthPage'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'

function App() {
  const { theme, themeToggler } = useChangeTheme()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <button onClick={themeToggler}>Toggle Theme</button>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/main"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<RegistrationPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
