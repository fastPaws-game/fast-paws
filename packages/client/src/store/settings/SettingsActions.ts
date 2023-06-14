import { createAsyncThunk } from '@reduxjs/toolkit'
import SettingsApi from '../../api/SettingsApi'
import { ThemeVariants } from './SettingsSlice'

export const changeTheme = createAsyncThunk('theme/changeTheme', async (theme: ThemeVariants, { rejectWithValue }) => {
  try {
    return await SettingsApi.putTheme(theme)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeAudio = createAsyncThunk('theme/changeAudio', async (audio: boolean, { rejectWithValue }) => {
  try {
    return await SettingsApi.putAudio(audio)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeMusic = createAsyncThunk('theme/changeMusic', async (music: number, { rejectWithValue }) => {
  try {
    return await SettingsApi.putMusic(music)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeSound = createAsyncThunk('theme/changeSound', async (soung: number, { rejectWithValue }) => {
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
