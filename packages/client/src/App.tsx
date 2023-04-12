import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import PageWrapper from './pages/PageWrapper'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks/store'
import { setIsAuth } from './store/auth/AuthSlice'

function App() {
  const { theme } = useChangeTheme()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth')
    dispatch(setIsAuth(isAuth === 'true'))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <PageWrapper>
          <Router />
        </PageWrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
