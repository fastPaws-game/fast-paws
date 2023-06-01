export type Comment = {
  id: number
  topicId: number
  user: string
  content: string
  createdAt: string
  updatedAt: string
}

export type CommentWithoutIdAndCreatedAtAndUpdatedAt = Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>
