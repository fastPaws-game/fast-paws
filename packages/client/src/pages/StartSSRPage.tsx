import { ThemeProvider } from 'styled-components'
import PageWrapper from './PageWrapper'
import { useChangeTheme } from '../hooks/useChangeTheme'
import LoadingScreen from '../components/LoadingScreen'

function StartSSRPage() {
  const { theme } = useChangeTheme()

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <LoadingScreen />
      </PageWrapper>
    </ThemeProvider>
  )
}

export default StartSSRPage
