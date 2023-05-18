import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getForums: (state, action) => {
      console.log(state, action)
    },
  },
  extraReducers: builder => {
    builder
  },
})

export const { getForums } = forumSlice.actions

export default forumSlice.reducer
