import { createAsyncThunk } from '@reduxjs/toolkit'
import ThemeApi from '../../api/ThemeApi'
import { ThemeVariants } from './ThemeSlice'

export const changeTheme = createAsyncThunk('theme/changeTheme', async (theme: ThemeVariants, { rejectWithValue }) => {
  try {
    return await ThemeApi.putTheme(theme)
  } catch (error) {
    return rejectWithValue(error)
  }
})
