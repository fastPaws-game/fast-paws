import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeVariants = 'light' | 'dark'

type ThemeSlice = {
  currentTheme: ThemeVariants
}

const initialState: ThemeSlice = {
  currentTheme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.currentTheme === 'light') {
        state.currentTheme = 'dark'
      } else {
        state.currentTheme = 'light'
      }
    },
    changeTheme: (state, action: PayloadAction<ThemeSlice['currentTheme']>) => {
      state.currentTheme = action.payload
    },
  },
})

export const { toggleTheme, changeTheme } = themeSlice.actions

export default themeSlice.reducer
