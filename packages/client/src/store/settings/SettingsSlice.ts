import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  buildChangeTheme,
  buildChangeAudio,
  buildChangeMusic,
  buildChangeSound,
  buildChangeLanguage,
} from './extraReducers'
import { AudioVolume } from '../../constants/game'

export type ThemeVariants = 'light' | 'dark'

export type SettingsSlice = {
  theme: ThemeVariants
  audio: boolean
  music: number // 0-10
  sound: number // 0-10
  language: string // 'en' | 'ru' | 'de' | 'fr'
}

const initialState: SettingsSlice = {
  theme: 'light',
  audio: true,
  music: AudioVolume.music,
  sound: AudioVolume.sound,
  language: 'en',
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<SettingsSlice['theme']>) => {
      state.theme = action.payload
    },
    setAudio: (state, action: PayloadAction<SettingsSlice['audio']>) => {
      state.audio = action.payload
    },
    setMusic: (state, action: PayloadAction<SettingsSlice['music']>) => {
      state.music = action.payload
    },
    setSound: (state, action: PayloadAction<SettingsSlice['sound']>) => {
      state.sound = action.payload
    },
    setLanguage: (state, action: PayloadAction<SettingsSlice['language']>) => {
      state.language = action.payload
    },
  },
  extraReducers: builder => {
    buildChangeTheme(builder)
    buildChangeAudio(builder)
    buildChangeMusic(builder)
    buildChangeSound(builder)
    buildChangeLanguage(builder)
  },
})

export const { setTheme, setMusic, setSound, setLanguage } = settingsSlice.actions
export default settingsSlice.reducer
