import { createAsyncThunk } from '@reduxjs/toolkit'
import AudioApi from '../../api/AudioApi'
import { TAudioStatus } from './AudioSlice'

export const changeAudio = createAsyncThunk('theme/changeTheme', async (audio: TAudioStatus, { rejectWithValue }) => {
  try {
    return await AudioApi.put(audio)
  } catch (error) {
    return rejectWithValue(error)
  }
})
