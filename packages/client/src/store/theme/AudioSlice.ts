import { createSlice } from '@reduxjs/toolkit'
import { buildChangeAudio } from './extraReducers'
// import { AudioVolume } from '../../constants/game'

export type TAudioStatus = 'on' | 'off'

export type AudioSlice = {
  audio: TAudioStatus
  // music: TAudioStatus
  // sound: TAudioStatus
  // musicVolume: number
  // soundVolume: number
}

export const audioInitialState: AudioSlice = {
  audio: 'on',
  // music: 'on',
  // sound: 'on',
  // musicVolume: AudioVolume.music,
  // soundVolume: AudioVolume.sound,
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState: audioInitialState,
  reducers: {
    setAudio: (state, action) => {
      state.audio = action.payload
    },
  },
  extraReducers: builder => {
    buildChangeAudio(builder)
  },
})

export const { setAudio } = audioSlice.actions
export default audioSlice.reducer
