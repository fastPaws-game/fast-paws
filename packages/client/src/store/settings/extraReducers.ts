import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { changeTheme, changeAudio, changeMusic, changeSound, changeLanguage } from './SettingsActions'
import { SettingsSlice } from './SettingsSlice'
import { AudioVolume } from '../../constants/game'

export const buildChangeTheme = (builder: ActionReducerMapBuilder<SettingsSlice>) =>
  builder
    .addCase(changeTheme.fulfilled, (state, action) => {
      state.theme = action.payload.theme
    })
    .addCase(changeTheme.rejected, state => {
      state.theme = 'dark'
    })

export const buildChangeAudio = (builder: ActionReducerMapBuilder<SettingsSlice>) =>
  builder
    .addCase(changeAudio.fulfilled, (state, action) => {
      state.audio = action.payload
    })
    .addCase(changeAudio.rejected, state => {
      state.audio = true
    })

export const buildChangeMusic = (builder: ActionReducerMapBuilder<SettingsSlice>) =>
  builder
    .addCase(changeMusic.fulfilled, (state, action) => {
      state.music = action.payload
    })
    .addCase(changeMusic.rejected, state => {
      state.music = AudioVolume.music
    })

export const buildChangeSound = (builder: ActionReducerMapBuilder<SettingsSlice>) =>
  builder
    .addCase(changeSound.fulfilled, (state, action) => {
      state.sound = action.payload
    })
    .addCase(changeSound.rejected, state => {
      state.sound = AudioVolume.sound
    })

export const buildChangeLanguage = (builder: ActionReducerMapBuilder<SettingsSlice>) =>
  builder
    .addCase(changeLanguage.fulfilled, (state, action) => {
      state.language = action.payload
    })
    .addCase(changeLanguage.rejected, state => {
      state.language = 'en'
    })
