import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from '../hooks/useChangeTheme'
import LoadingScreen from '../components/LoadingScreen'
import App from '../App'

function StartSSRPage() {
  const { theme } = useChangeTheme()

  return (
    <ThemeProvider theme={theme}>
      <LoadingScreen />
    </ThemeProvider>
  )
}

export default StartSSRPage
