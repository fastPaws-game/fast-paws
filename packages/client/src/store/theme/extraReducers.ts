import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { changeTheme } from './ThemeActions'
import { ThemeSlice } from './ThemeSlice'
import { AudioSlice } from './AudioSlice'
import { changeAudio } from './AudioActions'

export const buildChangeTheme = (builder: ActionReducerMapBuilder<ThemeSlice>) =>
  builder
    .addCase(changeTheme.fulfilled, (state, action) => {
      state.currentTheme = action.payload.theme
    })
    .addCase(changeTheme.rejected, state => {
      state.currentTheme = 'dark'
    })

export const buildChangeAudio = (builder: ActionReducerMapBuilder<AudioSlice>) =>
  builder
    .addCase(changeAudio.fulfilled, (state, action) => {
      state.audio = action.payload
    })
    .addCase(changeAudio.rejected, state => {
      state.audio = 'on'
    })
