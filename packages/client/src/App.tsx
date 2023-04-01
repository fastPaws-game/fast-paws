import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LeaderboardModule from './modules/leaderBoardModule'
import LeaderBoard from './modules/leaderBoardModule/LeaderBoard'
import LeaderBoardPage from './pages/LeaderBoardPage'


function App() {
  const { theme } = useChangeTheme()

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
