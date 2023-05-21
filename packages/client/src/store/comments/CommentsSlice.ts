import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildAddComment, buildDeleteComment, buildGetComments, buildUpdateComment } from './extraReducers'

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    buildDeleteComment(builder)
    buildUpdateComment(builder)
    buildAddComment(builder)
    buildGetComments(builder)
  },
})

export default commentsSlice.reducer
