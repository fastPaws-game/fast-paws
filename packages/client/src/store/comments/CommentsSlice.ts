import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildAddComment, buildDeleteComment, buildUpdateComment } from './extraReducers'

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    buildDeleteComment(builder)
    buildUpdateComment(builder)
    buildAddComment(builder)
  },
})

export default commentsSlice.reducer
