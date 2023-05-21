import { CommentsSlice } from './types'

export const initialState: CommentsSlice = {
  comments: [],
  editedComment: null,

  commentsStatus: 'initial',
  commentsError: null,

  commentEditStatus: 'initial',
  commentEditError: null,
}
