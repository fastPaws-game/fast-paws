import { RequestStatus } from '../types'
import { Comment } from '../../models/CommentModel'

export type CommentsSlice = {
  comments: Comment[]
  editedComment: Comment | null
  commentsStatus: RequestStatus
  commentsError: string | null

  commentEditStatus: RequestStatus
  commentEditError: string | null
}
