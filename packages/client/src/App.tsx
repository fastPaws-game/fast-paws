import styled, { ThemeProvider } from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { useFetchServerData } from './hooks/useFetchServerData'
import { GlobalStyles } from './assets/styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import GamePause from './components/gamePause'
import Button from './ui/button'
import { useCallback, useState } from 'react'

function App() {
  useFetchServerData()
  const { theme, themeToggler } = useChangeTheme()

  const [modal, setModal] = useState(false)

  const handelCloseModal = useCallback(() => {
    setModal(false)
  }, [setModal])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <button onClick={themeToggler}>Toggle Theme</button>
        {/*<Router/>*/}
        <Button onClick={() => setModal(true)} size={'small'}>Open</Button>
        <GamePause visible={modal} handleClose={handelCloseModal} />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
