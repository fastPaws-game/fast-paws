import React, { useEffect } from 'react'
import { darkTheme } from '../src/assets/styles/theme'
import BaseLayout from '../src/layouts/BaseLayout'
import { ThemeProvider } from 'styled-components'

const fetchServerData = async () => {
  const url = `http://localhost:${3001}/api` // __SERVER_PORT__ is undefined O_o
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
}

function App() {
  useEffect(() => {
    fetchServerData()
  }, [])
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">Hello world!!!</div>
    </ThemeProvider>
  )
}

export default App
