import { ThemeProvider } from 'styled-components'
import { Index } from './router'
import PageWrapper from './pages/PageWrapper'
import React from 'react'
import { useChangeTheme } from './hooks/useChangeTheme'

function App() {
  const { theme } = useChangeTheme()

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Index />
      </PageWrapper>
    </ThemeProvider>
  )
}

export default App
