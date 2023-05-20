import FetchApi from '../utils/fetchApi'
import { Forum, FullForum } from '../models/ForumModel'

class ForumApi {
  public getForums() {
    return FetchApi.get<Forum[]>('/forums')
  }

  public getForumById(id: number) {
    return FetchApi.get<FullForum>(`/forums/${id}`)
  }
}

export default new ForumApi()
