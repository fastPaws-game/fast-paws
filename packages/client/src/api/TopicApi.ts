import FetchApi from '../utils/fetchApi'
import { Topic } from '../models/TopicModel'

export type UpdateTopicPayload = {
  title: string
  content: string
}

class TopicApi {
  public addTopic(body: Topic) {
    return FetchApi.post('/topics', { body })
  }

  public getTopicById(id: number) {
    return FetchApi.get<Topic>(`/topics/${id}`)
  }

  public updateTopic(topicId: number, body: UpdateTopicPayload) {
    return FetchApi.patch<Topic>(`/topics/${topicId}`, { body })
  }

  public deleteTopic(topicId: number) {
    return FetchApi.delete(`/topics/${topicId}`)
  }
}

export default new TopicApi()
