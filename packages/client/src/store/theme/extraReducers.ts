import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { changeTheme } from './ThemeActions'
import { ThemeSlice } from './ThemeSlice'

export const buildChangeTheme = (builder: ActionReducerMapBuilder<ThemeSlice>) =>
  builder
    .addCase(changeTheme.fulfilled, (state, action) => {
      state.currentTheme = action.payload.theme
    })
    .addCase(changeTheme.rejected, state => {
      state.currentTheme = 'dark'
    })
