import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import PageWrapper from './pages/PageWrapper'
import { Suspense, useEffect } from 'react'
import { useAppDispatch } from './hooks/store'
import { getUser, setIsAuth } from './store/auth/AuthActions'
import LocalStorage from './utils/localStorage'
import { changeTheme } from './store/theme/ThemeSlice'
import LoadingPage from './components/LoadingScreen'
import { Themes } from './constants/themes'

function App() {
  const currentTheme = LocalStorage.get('Theme') || 'light'
  const dispatch = useAppDispatch()
  let isAuth: boolean

  useEffect(() => {
    (async () => {
      dispatch(changeTheme(currentTheme))
      await dispatch(getUser())
        .unwrap()
        .then(() => {
          isAuth = true
        })
        .catch(() => {
          isAuth = false
        })
      dispatch(setIsAuth(isAuth))
    }
    )()
  }, [])

  return (
    <ThemeProvider theme={Themes[currentTheme]}>
      <Suspense fallback={<LoadingPage />}>
        <GlobalStyles />
        <BrowserRouter>
          <PageWrapper>
            <Router />
          </PageWrapper>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
