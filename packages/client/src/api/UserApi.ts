import FetchApi from '../utils/fetchApi'
import { User } from '../models/User'
import { ProfileFormValuesType } from '../components/ProfileForm'

class UserApi {
  public getUser() {
    return FetchApi.get<User>('/auth/user')
  }
  public updateUser(data: ProfileFormValuesType) {
    return FetchApi.put('/user/profile', { body: JSON.stringify(data) })
  }
}

export default new UserApi()
