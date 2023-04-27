import React, { useEffect } from 'react'
import { darkTheme } from '../src/assets/styles/theme'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../src/assets/styles/globalStyle'
import PageWrapper from '../src/pages/PageWrapper'
import LoadingPage from '../src/components/LoadingScreen'
import { Router } from '../src/router'

const fetchServerData = async () => {
  const url = `http://localhost:${3001}/api` // __SERVER_PORT__ is undefined O_o
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
}

function App() {
  useEffect(() => {
    fetchServerData()
  }, [])
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={darkTheme}>
        <PageWrapper>
          <LoadingPage />
					{/* <Router /> */}
        </PageWrapper>
      </ThemeProvider>
    </>
  )
}

export default App
