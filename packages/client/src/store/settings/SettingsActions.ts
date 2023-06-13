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

export const changeMusic = createAsyncThunk('theme/changeTheme', async (music: number, { rejectWithValue }) => {
  try {
    return await SettingsApi.putMusic(music)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeSoung = createAsyncThunk('theme/changeTheme', async (soung: number, { rejectWithValue }) => {
  try {
    return await SettingsApi.putSoung(soung)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeLanguage = createAsyncThunk('theme/changeTheme', async (language: string, { rejectWithValue }) => {
  try {
    return await SettingsApi.putLanguage(language)
  } catch (error) {
    return rejectWithValue(error)
  }
})
