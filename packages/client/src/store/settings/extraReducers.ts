import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { changeTheme, changeAudioEnabled, changeMusic, changeSound, changeLanguage } from './SettingsActions'
import { TSettings } from './SettingsSlice'
import { AudioVolume } from '../../constants/game'

export const buildChangeTheme = (builder: ActionReducerMapBuilder<TSettings>) =>
  builder
    .addCase(changeTheme.fulfilled, (state, action) => {
      state.theme = action.payload.theme
    })
    .addCase(changeTheme.rejected, state => {
      state.theme = 'dark'
    })

export const buildChangeAudio = (builder: ActionReducerMapBuilder<TSettings>) =>
  builder
    .addCase(changeAudioEnabled.fulfilled, (state, action) => {
      state.audioEnabled = action.payload
    })
    .addCase(changeAudioEnabled.rejected, state => {
      state.audioEnabled = true
    })

export const buildChangeMusic = (builder: ActionReducerMapBuilder<TSettings>) =>
  builder
    .addCase(changeMusic.fulfilled, (state, action) => {
      state.musicVolume = action.payload
    })
    .addCase(changeMusic.rejected, state => {
      state.musicVolume = AudioVolume.music
    })

export const buildChangeSound = (builder: ActionReducerMapBuilder<TSettings>) =>
  builder
    .addCase(changeSound.fulfilled, (state, action) => {
      state.soundVolume = action.payload
    })
    .addCase(changeSound.rejected, state => {
      state.soundVolume = AudioVolume.sound
    })

export const buildChangeLanguage = (builder: ActionReducerMapBuilder<TSettings>) =>
  builder
    .addCase(changeLanguage.fulfilled, (state, action) => {
      state.language = action.payload
    })
    .addCase(changeLanguage.rejected, state => {
      state.language = 'en'
    })
