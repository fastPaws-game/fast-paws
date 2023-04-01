import { useEffect, useState } from 'react'
import { lightTheme, darkTheme } from '../assets/styles/theme'

const Themes: Record<string, typeof lightTheme> = {
  light: lightTheme,
  dark: darkTheme,
}
export const useChangeTheme = () => {
  const [themeName, setTheme] = useState('light')

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const themeToggler = () => {
    themeName === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme)
  }, [])

  return { theme: Themes[themeName], themeToggler }
}
