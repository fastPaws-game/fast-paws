import { createAsyncThunk } from '@reduxjs/toolkit'
import ThemeApi from '../../api/ThemeApi'
import { TTheme } from '../../models/ThemeModel'
import { ThemeVariants } from './ThemeSlice'

export const getTheme = createAsyncThunk('theme/getTheme', async (body: TTheme, { rejectWithValue }) => {
  try {
    return await ThemeApi.getTheme()
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const changeTheme = createAsyncThunk('theme/changeTheme', async (theme: ThemeVariants, { rejectWithValue }) => {
  try {
    return await ThemeApi.putTheme(theme)
  } catch (error) {
    return rejectWithValue(error)
  }
})
