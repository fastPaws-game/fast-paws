import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { handleError } from '../../utils/handleError'
import { addComment, deleteComment, getComments, updateComment } from './CommentsActions'
import { CommentsSlice } from './types'

export const buildGetComments = (builder: ActionReducerMapBuilder<CommentsSlice>) =>
  builder
    .addCase(getComments.pending, state => {
      state.commentsStatus = 'pending'
    })
    .addCase(getComments.fulfilled, (state, action) => {
      state.commentsStatus = 'success'
      state.comments = action.payload
    })
    .addCase(getComments.rejected, (state, action) => {
      state.commentsStatus = 'error'
      state.commentsError = handleError(action.payload)
    })

export const buildAddComment = (builder: ActionReducerMapBuilder<CommentsSlice>) =>
  builder
    .addCase(addComment.pending, state => {
      state.commentEditStatus = 'pending'
    })
    .addCase(addComment.fulfilled, (state, action) => {
      state.commentEditStatus = 'success'
      state.commentEditError = null

      state.comments.push(action.payload)
    })
    .addCase(addComment.rejected, (state, action) => {
      state.commentEditStatus = 'error'
      state.commentEditError = handleError(action.payload)
    })

export const buildUpdateComment = (builder: ActionReducerMapBuilder<CommentsSlice>) =>
  builder
    .addCase(updateComment.pending, state => {
      state.commentEditStatus = 'pending'
    })
    .addCase(updateComment.fulfilled, (state, action) => {
      state.commentEditStatus = 'success'
      state.commentEditError = null

      const { id, content } = action.payload
      state.comments.forEach(comment => {
        if (comment.id === id) {
          comment.content = content
        }
      })
    })
    .addCase(updateComment.rejected, (state, action) => {
      state.commentEditStatus = 'error'
      state.commentEditError = handleError(action.payload)
    })

export const buildDeleteComment = (builder: ActionReducerMapBuilder<CommentsSlice>) =>
  builder
    .addCase(deleteComment.pending, state => {
      state.commentEditStatus = 'pending'
    })
    .addCase(deleteComment.fulfilled, (state, action) => {
      state.commentEditStatus = 'success'
      state.commentEditError = null

      const id = action.payload
      state.comments = state.comments.filter(comment => comment.id !== id)
    })
    .addCase(deleteComment.rejected, (state, action) => {
      state.commentEditStatus = 'error'
      state.commentEditError = handleError(action.payload)
    })
