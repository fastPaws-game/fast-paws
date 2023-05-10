import FetchApi from '../utils/fetchApi'
import { TProfile } from '../models/ProfileModel'
import { TChangingPasswords } from '../models/PasswordsModel'
import { UserRepository } from '../services/userService'

export class UserAPI implements UserRepository {
  public getUser() {
    return FetchApi.get('/auth/user')
  }

  public updateUser(data: TProfile) {
    return FetchApi.put('/user/profile', { body: JSON.stringify(data) })
  }

  public updatePassword(data: TChangingPasswords) {
    return FetchApi.put('/user/password', { body: JSON.stringify(data) })
  }

  public updateUserAvatar(data: FormData) {
    return FetchApi.putData('/user/profile/avatar', { body: data })
  }
}

export default new UserAPI()
