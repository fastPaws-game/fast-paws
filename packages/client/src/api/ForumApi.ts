import FetchApi from '../utils/fetchApi'

type AddTopicPayload = {
  title: string
  content: string
  forumId: number
  user: string
}

type UpdateTopicPayload = {
  title: string
  content: string
}

class ForumApi {
  public getForums() {
    return FetchApi.get('/forums')
  }

  public getForumById(id: number) {
    return FetchApi.get(`/forums/${id}`)
  }

  public addTopic(body: AddTopicPayload) {
    return FetchApi.post('/topics', { body })
  }

  public getTopicById(id: number) {
    return FetchApi.get(`/topics/${id}`)
  }

  public updateTopic(topicId: number, body: UpdateTopicPayload) {
    return FetchApi.patch(`/topics/${topicId}`, { body })
  }

  public deleteTopic(topicId: number) {
    return FetchApi.delete(`/topics/${topicId}`)
  }
}

export default new ForumApi()
