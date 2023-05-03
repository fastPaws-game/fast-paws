import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeVariants = 'light' | 'dark'

type ThemeSlice = {
  currentTheme: ThemeVariants
}

const initialState: ThemeSlice = {
  currentTheme: 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light'
      state.currentTheme = newTheme
      // LocalStorage.set('Theme', newTheme)
    },
    changeTheme: (state, action: PayloadAction<ThemeSlice['currentTheme']>) => {
      state.currentTheme = action.payload
      // LocalStorage.set('Theme', action.payload)
    }
  }
})

export const { toggleTheme, changeTheme } = themeSlice.actions

export default themeSlice.reducer
