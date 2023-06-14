import { createAsyncThunk } from '@reduxjs/toolkit'
import SettingsApi from '../../api/SettingsApi'
import { ThemeVariants } from './SettingsSlice'

export const changeTheme = createAsyncThunk('settings/setTheme', async (theme: ThemeVariants, { rejectWithValue }) => {
  try {
    return await SettingsApi.putTheme(theme)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeAudio = createAsyncThunk('settings/setAudio', async (audio: boolean, { rejectWithValue }) => {
  try {
    return await SettingsApi.putAudio(audio)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeMusic = createAsyncThunk('settings/setMusic', async (music: number, { rejectWithValue }) => {
  try {
    return await SettingsApi.putMusic(music)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeSound = createAsyncThunk('settings/setSound', async (soung: number, { rejectWithValue }) => {
  try {
    return await SettingsApi.putSoung(soung)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeLanguage = createAsyncThunk(
  'theme/changeLanguage',
  async (language: string, { rejectWithValue }) => {
    try {
      return await SettingsApi.putLanguage(language)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
