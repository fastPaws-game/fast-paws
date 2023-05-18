import { ThemeProvider } from 'styled-components'
import { Router } from './router'
import { useChangeTheme } from './hooks/useChangeTheme'

function App() {
  const { theme } = useChangeTheme()

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default App
