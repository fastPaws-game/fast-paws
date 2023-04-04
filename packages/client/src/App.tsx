import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom'
import RequireAuth from './modules/authModule/RequireAuth'
import AuthPage from './pages/AuthPage'
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
        {/* <Routes>
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
        </Routes> */}
      </ThemeProvider>

  )
}

export default App
