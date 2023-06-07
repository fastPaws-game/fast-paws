import { useAppDispatch, useAppSelector } from './store'
import { changeTheme } from '../store/theme/ThemeActions'
import { ThemeVariants } from '../store/theme/ThemeSlice'
import { Themes } from '../constants/themes'
import { themeSelectors } from '../store/theme/ThemeSelectors'

export const useChangeTheme = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(themeSelectors.getCurrentTheme)

  const toggleTheme = () => {
    const newTheme: ThemeVariants = currentTheme === 'light' ? 'dark' : 'light'
    dispatch(changeTheme(newTheme))
  }

  return { theme: Themes[currentTheme], toggleTheme }
}
