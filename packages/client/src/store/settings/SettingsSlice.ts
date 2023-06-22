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
  audioEnabled: boolean // Game audio global
  musicVolume: number // Music volume 0-10
  soundVolume: number // Sounds volume 0-10
  language: string // 'en' | 'ru' | 'de' | 'fr'
  metersEnabled: boolean // Performance meters
}

const initialState: TSettings = {
  theme: 'light',
  audioEnabled: true,
  musicVolume: AudioVolume.music,
  soundVolume: AudioVolume.sound,
  language: 'en',
  metersEnabled: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TSettings['theme']>) => {
      state.theme = action.payload
    },
    setAudioEnabled: (state, action: PayloadAction<TSettings['audioEnabled']>) => {
      state.audioEnabled = action.payload
    },
    setMusicVolume: (state, action: PayloadAction<TSettings['musicVolume']>) => {
      state.musicVolume = action.payload
    },
    setSoundVolume: (state, action: PayloadAction<TSettings['soundVolume']>) => {
      state.soundVolume = action.payload
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

export const { setTheme, setAudioEnabled, setMusicVolume, setSoundVolume, setLanguage } = settingsSlice.actions
export default settingsSlice.reducer
