import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildAddTopic, buildDeleteTopic, buildGetTopicById, buildUpdateTopic } from './extraReducers'

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: builder => {
    buildDeleteTopic(builder)
    buildUpdateTopic(builder)
    buildAddTopic(builder)
    buildGetTopicById(builder)
  },
})

export default topicSlice.reducer
