import FetchApi from '../utils/fetchApi'
import { User } from '../models/User'

class UserApi {
  public getUser() {
    return FetchApi.get<User>('/auth/user')
  }
}

export default new UserApi()
