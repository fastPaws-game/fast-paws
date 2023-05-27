import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { changeTheme, getTheme } from './ThemeActions'
import { ThemeSlice } from './ThemeSlice'

export const buildGetTheme = (builder: ActionReducerMapBuilder<ThemeSlice>) =>
  builder
    .addCase(getTheme.fulfilled, (state, action) => {
      state.currentTheme = action.payload.theme
    })
    .addCase(getTheme.rejected, state => {
      state.currentTheme = 'dark'
    })

export const buildChangeTheme = (builder: ActionReducerMapBuilder<ThemeSlice>) =>
  builder
    .addCase(changeTheme.fulfilled, (state, action) => {
      state.currentTheme = action.payload.theme
    })
    .addCase(changeTheme.rejected, state => {
      state.currentTheme = 'dark'
    })
