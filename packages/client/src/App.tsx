import { ThemeProvider } from 'styled-components'
import { Router } from './router'
import PageWrapper from './pages/PageWrapper'
import React from 'react'
import { useChangeTheme } from './hooks/useChangeTheme'

function App() {
  const { theme } = useChangeTheme()

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Router />
      </PageWrapper>
    </ThemeProvider>
  )
}

export default App
