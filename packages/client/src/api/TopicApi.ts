import { FetchForumApi } from '../utils/fetchApi'
import { Topic, TopicWithoutIdAndComments } from '../models/TopicModel'

export type UpdateTopicPayload = {
  title: string
  content: string
}

class TopicApi {
  public addTopic(body: TopicWithoutIdAndComments) {
    return FetchForumApi.post('/topics', { body })
  }

  public getTopicById(id: number) {
    return FetchForumApi.get<Topic>(`/topics/${id}`)
  }

  public updateTopic(topicId: number, body: UpdateTopicPayload) {
    return FetchForumApi.patch<Topic>(`/topics/${topicId}`, { body })
  }

  public deleteTopic(topicId: number) {
    return FetchForumApi.delete(`/topics/${topicId}`)
  }
}

export default new TopicApi()
