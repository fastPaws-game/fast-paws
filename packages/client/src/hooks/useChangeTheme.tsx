import { useAppDispatch, useAppSelector } from './store'
import { changeTheme as change, ThemeVariants, toggleTheme as toggle } from '../store/theme/ThemeSlice'
import { Themes } from '../constants/themes'
import { themeSelectors } from '../store/theme/ThemeSelectors'

export const useChangeTheme = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(themeSelectors.getCurrentTheme)

  const changeTheme = (themeKey: ThemeVariants) => {
    dispatch(change(themeKey))
  }
  const toggleTheme = () => {
    dispatch(toggle())
  }

  return { theme: Themes[currentTheme], changeTheme, toggleTheme }
}
