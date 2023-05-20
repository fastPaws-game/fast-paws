import { createAsyncThunk } from '@reduxjs/toolkit'
import { Topic } from '../../models/TopicModel'
import CommentsApi from '../../api/CommentsApi'
import { Comment } from '../../models/CommentModel'
import TopicApi, { UpdateTopicPayload } from '../../api/TopicApi'

type Payload<T> = {
  id: number
  data: T
}
export const addTopic = createAsyncThunk('forum/getForums', async (data: Topic, { rejectWithValue }) => {
  try {
    await TopicApi.addTopic(data)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const getTopicById = createAsyncThunk('forum/getForums', async (id: number, { rejectWithValue }) => {
  try {
    await TopicApi.getTopicById(id)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const updateTopic = createAsyncThunk(
  'forum/getForums',
  async ({ id, data }: Payload<UpdateTopicPayload>, { rejectWithValue }) => {
    try {
      await TopicApi.updateTopic(id, data)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const deleteTopic = createAsyncThunk('forum/getForums', async (id: number, { rejectWithValue }) => {
  try {
    await TopicApi.deleteTopic(id)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const getComments = createAsyncThunk('forum/getForums', async (_, { rejectWithValue }) => {
  try {
    await CommentsApi.getComments()
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const addComment = createAsyncThunk('forum/getForums', async (data: Comment, { rejectWithValue }) => {
  try {
    await CommentsApi.addComment(data)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const updateComment = createAsyncThunk(
  'forum/getForums',
  async ({ id, data }: Payload<Comment>, { rejectWithValue }) => {
    try {
      await CommentsApi.updateComment(id, data)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const deleteComment = createAsyncThunk('forum/getForums', async (id: number, { rejectWithValue }) => {
  try {
    await CommentsApi.deleteComment(id)
  } catch (e) {
    return rejectWithValue(e)
  }
})
