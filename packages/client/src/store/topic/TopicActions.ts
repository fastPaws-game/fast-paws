import { createAsyncThunk } from '@reduxjs/toolkit'
import { TopicWithoutIdAndComments } from '../../models/TopicModel'
import TopicApi, { UpdateTopicPayload } from '../../api/TopicApi'

type Payload<T> = {
  id: number
  data: T
}
export const addTopic = createAsyncThunk(
  'topic/addTopic',
  async (data: TopicWithoutIdAndComments, { rejectWithValue }) => {
    try {
      await TopicApi.addTopic(data)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getTopicById = createAsyncThunk('topic/getTopicById', async (id: number, { rejectWithValue }) => {
  try {
    return await TopicApi.getTopicById(id)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const updateTopic = createAsyncThunk(
  'topic/updateTopic',
  async ({ id, data }: Payload<UpdateTopicPayload>, { rejectWithValue }) => {
    try {
      return await TopicApi.updateTopic(id, data)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const deleteTopic = createAsyncThunk('topic/deleteTopic', async (id: number, { rejectWithValue }) => {
  try {
    return await TopicApi.deleteTopic(id)
  } catch (e) {
    return rejectWithValue(e)
  }
})
