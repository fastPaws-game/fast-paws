import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import PageWrapper from './pages/PageWrapper'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './hooks/store'
import { getUser, setIsAuth, signInUser } from './store/auth/AuthActions'
import LocalStorage from './utils/localStorage'
import { changeTheme } from './store/theme/ThemeSlice'
import LoadingPage from './components/LoadingScreen'
import { useChangeTheme } from './hooks/useChangeTheme'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const { theme } = useChangeTheme()
  const currentTheme = LocalStorage.get('Theme') || 'light'
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  let isAuth: boolean
  const search = new URLSearchParams(window.location.search)
  const code = search.get('code')

  useEffect(() => {
    ;(async () => {
      dispatch(changeTheme(currentTheme))
      setIsLoading(true)
      if (code) {
        dispatch(signInUser(code)).unwrap().then(() => {
          history.pushState(null, document.title, window.location.origin)
          isAuth = true
        }
        ).catch(() => {
          isAuth = false
        })
      } else {
        await dispatch(getUser())
          .unwrap()
          .then(() => {
            isAuth = true
          })
          .catch(() => {
            isAuth = false
          })
      }
      dispatch(setIsAuth(isAuth))
      setIsLoading(false)
    })()
  }, [code])

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary>
            <PageWrapper>{isLoading ? <LoadingPage /> : <Router />}</PageWrapper>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
