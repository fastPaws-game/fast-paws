import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import PageWrapper from './pages/PageWrapper'
import { Suspense, useEffect, useState } from 'react'
import { useAppDispatch } from './hooks/store'
import { getUser, setIsAuth } from './store/auth/AuthActions'
import LocalStorage from './utils/localStorage'
import { changeTheme } from './store/theme/ThemeSlice'
import LoadingPage from './components/LoadingScreen'
import { useChangeTheme } from './hooks/useChangeTheme'

function App() {
  const { theme } = useChangeTheme()
  const currentTheme = LocalStorage.get('Theme') || 'light'
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  let isAuth: boolean

  useEffect(() => {
    (async () => {
      dispatch(changeTheme(currentTheme))
      setIsLoading(true)
      await dispatch(getUser())
        .unwrap()
        .then(() => {
          isAuth = true
        })
        .catch(() => {
          isAuth = false
        })
      dispatch(setIsAuth(isAuth))
      setIsLoading(false)
    })()
  }, [])

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <PageWrapper>
            <Suspense fallback={<LoadingPage />}>{!isLoading && <Router />}</Suspense>
          </PageWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
