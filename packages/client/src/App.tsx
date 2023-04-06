import { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { GlobalStyles } from './assets/styles/globalStyle'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

function App() {
  const { theme, themeToggler } = useChangeTheme()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <button onClick={themeToggler}>Toggle Theme</button>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
