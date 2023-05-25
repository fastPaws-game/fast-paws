import FetchApi from '../utils/fetchApi'
import { Comment } from '../models/CommentModel'

type AddCommentPayload = {
  topicId: number
  user: string
  content: string
}

type UpdateCommentPayload = {
  content: string
}

class CommentsApi {
  public addComment(body: AddCommentPayload) {
    return FetchApi.post<Comment>(`/comments`, { body })
  }

  public updateComment(commentId: number, body: UpdateCommentPayload) {
    return FetchApi.patch(`/comments/${commentId}`, { body })
  }

  public deleteComment(commentId: number) {
    return FetchApi.delete(`/comments/${commentId}`)
  }
}

export default new CommentsApi()
