import { RootState } from '../index'

const getCurrentTopic = (state: RootState) => state.topic.currentTopic

export const topicsSelectors = {
  getCurrentTopic,
}
