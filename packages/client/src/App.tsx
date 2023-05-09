import { ThemeProvider } from 'styled-components'
import { Router } from './router'
import PageWrapper from './pages/PageWrapper'
import React, { useEffect, useState } from 'react'
import { useChangeTheme } from './hooks/useChangeTheme'
import { getUser } from './store/auth/AuthActions'
import { changeTheme } from './store/theme/ThemeSlice'
import { setIsAuth } from './store/auth/AuthSlice'
import { useAppDispatch } from './hooks/store'
import localStorage from './utils/localStorage'

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
