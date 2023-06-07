import { Comment } from './CommentModel'

export type Forum = {
  id: number
  title: string
  topicsCount: number
}

export type FullForum = {
  id: number
  title: string
  topics:
    | [
        {
          id: number
          title: string
          content: string
          commentsCount: number
          lastMessage: Comment
        }
      ]
    | []
}
