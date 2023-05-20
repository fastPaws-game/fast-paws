import { RootState } from '../index'

const getForums = (state: RootState) => state.forum.forums
const getForumById = (state: RootState) => state.forum.currentForum

export const forumSelectors = {
  getForumById,
  getForums,
}
