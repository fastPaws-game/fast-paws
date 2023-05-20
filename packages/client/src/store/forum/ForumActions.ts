import { createAsyncThunk } from '@reduxjs/toolkit'
import ForumApi from '../../api/ForumApi'

export const getForums = createAsyncThunk('forum/getForums', async (_, { rejectWithValue }) => {
  try {
    return await ForumApi.getForums()
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const getForumById = createAsyncThunk('forum/getForumById', async (id: number, { rejectWithValue }) => {
  try {
    return await ForumApi.getForumById(id)
  } catch (e) {
    return rejectWithValue(e)
  }
})
