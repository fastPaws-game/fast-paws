import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'
import LeaderBoardPage from './pages/LeaderBoardPage'
import AuthPage from './pages/AuthPage'
import { useChangeTheme } from './hooks/useChangeTheme'

function App() {
  const { theme } = useChangeTheme()
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route path='/logins' element={<LeaderBoardPage />} />
          <Route
            path='/main'
            element={
              // <RequireAuth>
              <MainPage />
              // </RequireAuth>
            }
          />
          <Route path='/signup' element={<RegistrationPage />} />
          <Route path='/' element={<AuthPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
