import { Forum, FullForum } from '../../models/ForumModel'
import { RequestStatus } from '../types'

export type ForumSlice = {
  forums: Forum[]
  currentForum: FullForum | null

  forumsStatus: RequestStatus
  forumsError: string | null

  currentForumStatus: RequestStatus
  currentForumError: string | null
}
