import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'

export const topicSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getTopic: (state, action) => {
      console.log(state, action)
    },
  },
  extraReducers: builder => {
    builder
  },
})

export const { getTopic } = topicSlice.actions

export default topicSlice.reducer
