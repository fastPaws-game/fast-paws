import { createSlice } from '@reduxjs/toolkit'
import { buildGetTheme, buildChangeTheme } from './extraReducers'

export type ThemeVariants = 'light' | 'dark'

export type ThemeSlice = {
  currentTheme: ThemeVariants
}

const initialState: ThemeSlice = {
  currentTheme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {} /*{
    toggleTheme: state => {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light'

      state.currentTheme = newTheme
    },
    changeTheme: (state, action: PayloadAction<ThemeSlice['currentTheme']>) => {
      state.currentTheme = action.payload
    },
  },*/,
  extraReducers: builder => {
    buildGetTheme(builder)
    buildChangeTheme(builder)
  },
})

export default themeSlice.reducer
