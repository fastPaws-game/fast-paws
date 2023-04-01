import { fetchApi } from '../utils/fetchApi'

class GetUserApi {
  protected fetchApi: fetchApi
  constructor() {
    this.fetchApi = new fetchApi('/auth')
  }

  public getUser() {
    return this.fetchApi.get('/user')
  }
}

export default new GetUserApi()
