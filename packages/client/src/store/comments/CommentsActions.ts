import { createAsyncThunk } from '@reduxjs/toolkit'
import CommentsApi from '../../api/CommentsApi'
import { CommentWithoutIdAndCreatedAtAndUpdatedAt } from '../../models/CommentModel'

export type CommentUpdPayload = {
  id: number
  content: string
}

export const getComments = createAsyncThunk('comments/getComments', async (_, { rejectWithValue }) => {
  try {
    return await CommentsApi.getComments()
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: CommentWithoutIdAndCreatedAtAndUpdatedAt, { rejectWithValue }) => {
    try {
      return await CommentsApi.addComment(data)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ id, content }: CommentUpdPayload, { rejectWithValue }) => {
    try {
      await CommentsApi.updateComment(id, { content })

      return { id, content }
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id: number, { rejectWithValue }) => {
  try {
    await CommentsApi.deleteComment(id)

    return id
  } catch (e) {
    return rejectWithValue(e)
  }
})
