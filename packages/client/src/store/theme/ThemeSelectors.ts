import { RootState } from '../index'

const getCurrentTheme = (state: RootState) => state.theme.currentTheme

export const themeSelectors = {
  getCurrentTheme,
}
