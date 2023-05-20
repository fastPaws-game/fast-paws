import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { ForumSlice } from './types'
import { getForumById, getForums } from './ForumActions'
import { handleError } from '../../utils/handleError'

export const buildGetForums = (builder: ActionReducerMapBuilder<ForumSlice>) =>
  builder
    .addCase(getForums.pending, state => {
      state.forumsStatus = 'pending'
    })
    .addCase(getForums.fulfilled, (state, action) => {
      state.forumsStatus = 'success'
      state.forums = action.payload
    })
    .addCase(getForums.rejected, (state, action) => {
      state.forumsStatus = 'error'
      state.forumsError = handleError(action.payload)
    })

export const buildGetForumById = (builder: ActionReducerMapBuilder<ForumSlice>) =>
  builder
    .addCase(getForumById.pending, state => {
      state.currentForumStatus = 'pending'
    })
    .addCase(getForumById.fulfilled, (state, action) => {
      state.currentForumStatus = 'success'
      state.currentForumError = null
      state.currentForum = action.payload
    })
    .addCase(getForumById.rejected, (state, action) => {
      state.currentForumStatus = 'error'
      state.currentForumError = handleError(action.payload)
    })
