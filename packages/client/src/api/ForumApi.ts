import { FetchForumApi } from '../utils/fetchApi'
import { Forum, FullForum } from '../models/ForumModel'

class ForumApi {
  public getForums() {
    return FetchForumApi.get<Forum[]>('/forums')
  }

  public getForumById(id: number) {
    return FetchForumApi.get<FullForum>(`/forums/${id}`)
  }
}

export default new ForumApi()
