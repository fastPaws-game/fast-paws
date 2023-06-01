import { createSlice } from '@reduxjs/toolkit'
import { buildChangeTheme } from './extraReducers'

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
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload // Обновление значения currentTheme
    },
  },
  extraReducers: builder => {
    buildChangeTheme(builder)
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
