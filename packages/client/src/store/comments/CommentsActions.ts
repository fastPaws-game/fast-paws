import { createAsyncThunk } from '@reduxjs/toolkit'
import CommentsApi from '../../api/CommentsApi'
import { Comment } from '../../models/CommentModel'

type Payload = {
  id: number
  content: string
}

export const addComment = createAsyncThunk('comments/addComment', async (data: Comment, { rejectWithValue }) => {
  try {
    return await CommentsApi.addComment(data)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ id, content }: Payload, { rejectWithValue }) => {
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
