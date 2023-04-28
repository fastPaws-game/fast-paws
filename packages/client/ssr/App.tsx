import React, { useEffect, useState } from 'react'
import { darkTheme } from '../src/assets/styles/theme'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../src/assets/styles/globalStyle'
import PageWrapper from '../src/pages/PageWrapper'
import LoadingPage from '../src/components/LoadingScreen'
import { Router } from './routes/Router'
import { useChangeTheme } from '../src/hooks/useChangeTheme'
import LocalStorage from '../src//utils/localStorage'
import { BrowserRouter } from 'react-router-dom'

const fetchServerData = async () => {
  const url = `http://localhost:${3001}/api` // __SERVER_PORT__ is undefined O_o
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
}

function App() {
  // const { theme } = useChangeTheme()
  // const currentTheme = LocalStorage.get('Theme') || 'dark'
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchServerData()
  }, [])

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={darkTheme}>
        <PageWrapper>{isLoading ? <LoadingPage /> : <Router />}</PageWrapper>
      </ThemeProvider>
    </>
  )
}

export default App
