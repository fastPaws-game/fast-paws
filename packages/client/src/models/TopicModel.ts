import { Comment } from './CommentModel'

export type Topic = {
  id: number
  forumId: number | undefined
  title: string
  content: string
  user: string
  userAvatar: string
  comments: Comment[]
}

export type TopicWithoutIdAndComments = Omit<Topic, 'id' | 'comments'>
