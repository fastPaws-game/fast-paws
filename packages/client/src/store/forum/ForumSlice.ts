import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildGetForumById, buildGetForums } from './extraReducers'

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getForums: (state, action) => {
      console.log(state, action)
    },
  },
  extraReducers: builder => {
    buildGetForums(builder)
    buildGetForumById(builder)
  },
})

export const { getForums } = forumSlice.actions

export default forumSlice.reducer
