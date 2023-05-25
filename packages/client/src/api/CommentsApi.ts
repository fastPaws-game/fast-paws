import { FetchForumApi } from '../utils/fetchApi'
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
  public getComments() {
    return FetchForumApi.get<Comment[]>(`/comments`)
  }

  public addComment(body: AddCommentPayload) {
    return FetchForumApi.post<Comment>(`/comments`, { body })
  }

  public updateComment(commentId: number, body: UpdateCommentPayload) {
    return FetchForumApi.patch(`/comments/${commentId}`, { body })
  }

  public deleteComment(commentId: number) {
    return FetchForumApi.delete(`/comments/${commentId}`)
  }
}

export default new CommentsApi()
