import FetchApi from '../utils/fetchApi'

class UserApi {
  public getUser<T>() {
    return FetchApi.get<T>('/auth/user')
  }
}

export default new UserApi()
