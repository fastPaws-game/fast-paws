import { TopicSlice } from './types'

export const initialState: TopicSlice = {
  currentTopic: null,

  currentTopicStatus: 'initial',
  currentTopicError: null,
}
