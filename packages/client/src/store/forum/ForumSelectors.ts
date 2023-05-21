import { RootState } from '../index'

const getForums = (state: RootState) => state.forum.forums
const getCurrentForum = (state: RootState) => state.forum.currentForum

export const forumSelectors = {
  getCurrentForum,
  getForums,
}
