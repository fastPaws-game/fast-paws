import { RootState } from '../index'

const getTheme = (state: RootState) => state.settings.theme
const getAudioEnabled = (state: RootState) => state.settings.audioEnabled
const getMusicVolume = (state: RootState) => state.settings.musicVolume
const getSoungVolume = (state: RootState) => state.settings.soundVolume
const getLanguage = (state: RootState) => state.settings.language
const getMetersEnabled = (state: RootState) => state.settings.metersEnabled

export const SettingsSelectors = {
  getTheme,
  getAudioEnabled,
  getMusicVolume,
  getSoungVolume,
  getLanguage,
  getMetersEnabled,
}
