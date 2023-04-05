import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router'
import RequireAuth from './modules/authModule/RequireAuth'
import AuthPage from './pages/AuthPage'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'
import ForumPage from './pages/ForumPage'
import TopicPage from './pages/TopicPage'
import LeaderBoardPage from './pages/LeaderBoardPage'

function App() {
  const { theme, themeToggler } = useChangeTheme()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <button onClick={themeToggler}>Toggle Theme</button>
        <Routes>
          <Route path="/login" element={<LeaderBoardPage />} />
          <Route
            path="/main"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/newgames" element={<TopicPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
