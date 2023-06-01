import { RootState } from '../index'

const getComments = (state: RootState) => state.comments

export const commentsSelectors = {
  getComments,
}
