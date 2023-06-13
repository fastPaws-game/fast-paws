import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { buildChangeTheme, buildChangeMusic, buildChangeSound, buildChangeLanguage } from './extraReducers'
import { AudioVolume } from '../../constants/game'

export type ThemeVariants = 'light' | 'dark'

export type SettingsSlice = {
  theme: ThemeVariants
  music: number // 0-10
  sound: number // 0-10
  language: string // 'en' | 'ru' | 'de' | 'fr'
}

const initialState: SettingsSlice = {
  theme: 'light',
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
    // addCase cannot be called with two reducers for the same action type
    // buildChangeMusic(builder)
    // buildChangeSound(builder)
    // buildChangeLanguage(builder)
  },
})

export const { setTheme } = settingsSlice.actions
export default settingsSlice.reducer
