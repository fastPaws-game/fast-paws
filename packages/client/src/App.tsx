import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'
import LeaderBoardPage from './pages/LeaderBoardPage'
import { Provider } from 'react-redux'
import { store } from './store'
import AuthPage from './pages/AuthPage'

function App() {
  const { theme, themeToggler } = useChangeTheme()

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <button onClick={themeToggler}>Toggle Theme</button>
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
      </Provider>
    </BrowserRouter>
  )
}

export default App
