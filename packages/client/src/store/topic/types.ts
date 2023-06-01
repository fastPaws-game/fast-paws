import { Topic } from '../../models/TopicModel'
import { RequestStatus } from '../types'

export type TopicSlice = {
  currentTopic: Topic | null

  currentTopicStatus: RequestStatus
  currentTopicError: string | null
}
