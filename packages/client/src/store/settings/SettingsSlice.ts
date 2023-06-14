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

export type TSettings = {
  theme: ThemeVariants
  audio: boolean // Game audio global
  music: number // Music volume 0-10
  sound: number // Sounds volume 0-10
  language: string // 'en' | 'ru' | 'de' | 'fr'
  meters: boolean // Performance meters
}

const initialState: TSettings = {
  theme: 'light',
  audio: true,
  music: AudioVolume.music,
  sound: AudioVolume.sound,
  language: 'en',
  meters: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TSettings['theme']>) => {
      state.theme = action.payload
    },
    setAudio: (state, action: PayloadAction<TSettings['audio']>) => {
      state.audio = action.payload
    },
    setMusic: (state, action: PayloadAction<TSettings['music']>) => {
      state.music = action.payload
    },
    setSound: (state, action: PayloadAction<TSettings['sound']>) => {
      state.sound = action.payload
    },
    setLanguage: (state, action: PayloadAction<TSettings['language']>) => {
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
