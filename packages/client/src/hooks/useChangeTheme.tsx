import { useAppDispatch, useAppSelector } from './store'
import {
  changeTheme as change,
  toggleTheme as toggle,
} from '../store/theme/ThemeSlice'
import { Themes } from '../constants/themes'

export const useChangeTheme = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(state => state.theme.currentTheme)

  const changeTheme = (themeKey: 'light' | 'dark') => {
    dispatch(change(themeKey))
  }
  const toggleTheme = () => {
    dispatch(toggle())
  }

  return { theme: Themes[currentTheme], changeTheme, toggleTheme }
}
