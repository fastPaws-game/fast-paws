import { RootState } from '../index'

const getCurrentTopic = (state: RootState) => state.topic.currentTopic
const getCurrentTopicStatus = (state: RootState) => state.topic.currentTopicStatus

export const topicsSelectors = {
  getCurrentTopic,
  getCurrentTopicStatus,
}
