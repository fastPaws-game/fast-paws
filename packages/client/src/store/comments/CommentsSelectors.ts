import { RootState } from '../index'

const getComments = (state: RootState) => state.comments
const getCommentsStatus = (state: RootState) => state.comments.commentsStatus

export const commentsSelectors = {
  getComments,
  getCommentsStatus,
}
