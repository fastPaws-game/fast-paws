import { RootState } from '../index'

const getTheme = (state: RootState) => state.settings.theme
const getAudioEnabled = (state: RootState) => state.settings.audio
const getMusicVolume = (state: RootState) => state.settings.music
const getSoungVolume = (state: RootState) => state.settings.sound
const getLanguage = (state: RootState) => state.settings.language

export const SettingsSelectors = {
  getTheme,
  getAudioEnabled,
  getMusicVolume,
  getSoungVolume,
  getLanguage,
}
