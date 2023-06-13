import { RootState } from '../index'

const getTheme = (state: RootState) => state.settings.theme
const getMusic = (state: RootState) => state.settings.music
const getSoung = (state: RootState) => state.settings.sound
const getLanguage = (state: RootState) => state.settings.language

export const settingsSelectors = {
  getTheme,
  getMusic,
  getSoung,
  getLanguage,
}
