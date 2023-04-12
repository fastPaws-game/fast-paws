import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import PageWrapper from './pages/PageWrapper'

function App() {
  const { theme } = useChangeTheme()
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PageWrapper>
        <RouterProvider router={router} />
      </PageWrapper>
    </ThemeProvider>
  )
}

export default App
