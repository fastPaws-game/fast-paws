import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildGetForumById, buildGetForums } from './extraReducers'

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    buildGetForums(builder)
    buildGetForumById(builder)
  },
})

export default forumSlice.reducer
