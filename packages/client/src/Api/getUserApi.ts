import FetchApi from '../utils/fetchApi'

class GetUserApi {
  public getUser() {
    return FetchApi.get('/auth/user')
  }
}

export default new GetUserApi()
