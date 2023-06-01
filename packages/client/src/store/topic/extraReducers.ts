import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { TopicSlice } from './types'
import { addTopic, deleteTopic, getTopicById, updateTopic } from './TopicActions'
import { handleError } from '../../utils/handleError'

export const buildGetTopicById = (builder: ActionReducerMapBuilder<TopicSlice>) =>
  builder
    .addCase(getTopicById.pending, state => {
      state.currentTopicStatus = 'pending'
    })
    .addCase(getTopicById.fulfilled, (state, action) => {
      state.currentTopicStatus = 'success'
      state.currentTopicError = null
      state.currentTopic = action.payload
    })
    .addCase(getTopicById.rejected, (state, action) => {
      state.currentTopicStatus = 'error'
      state.currentTopicError = handleError(action.payload)
    })

export const buildAddTopic = (builder: ActionReducerMapBuilder<TopicSlice>) =>
  builder
    .addCase(addTopic.pending, state => {
      state.currentTopicStatus = 'pending'
    })
    .addCase(addTopic.fulfilled, state => {
      state.currentTopicStatus = 'success'
      state.currentTopicError = null
    })
    .addCase(addTopic.rejected, (state, action) => {
      state.currentTopicStatus = 'error'
      state.currentTopicError = handleError(action.payload)
    })

export const buildUpdateTopic = (builder: ActionReducerMapBuilder<TopicSlice>) =>
  builder
    .addCase(updateTopic.pending, state => {
      state.currentTopicStatus = 'pending'
    })
    .addCase(updateTopic.fulfilled, (state, action) => {
      state.currentTopicStatus = 'success'
      state.currentTopicError = null
      state.currentTopic = action.payload
    })
    .addCase(updateTopic.rejected, (state, action) => {
      state.currentTopicStatus = 'error'
      state.currentTopicError = handleError(action.payload)
    })

export const buildDeleteTopic = (builder: ActionReducerMapBuilder<TopicSlice>) =>
  builder
    .addCase(deleteTopic.pending, state => {
      state.currentTopicStatus = 'pending'
    })
    .addCase(deleteTopic.fulfilled, state => {
      state.currentTopicStatus = 'success'
      state.currentTopicError = null
    })
    .addCase(deleteTopic.rejected, (state, action) => {
      state.currentTopicStatus = 'error'
      state.currentTopicError = handleError(action.payload)
    })
