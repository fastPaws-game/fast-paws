import FetchApi from '../utils/fetchApi'
import { TProfile } from '../models/ProfileModel'
import { TChangingPasswords } from '../models/PasswordsModel'
import { UserRepository } from '../services/userService'
import { TUser } from '../models/UserModel'

export class UserAPI implements UserRepository {
  public getUser() {
    return FetchApi.get('/auth/user')
  }

  public updateUser(body: TProfile) {
    return FetchApi.put<TUser>('/user/profile', { body })
  }

  public updatePassword(body: TChangingPasswords) {
    return FetchApi.put('/user/password', { body })
  }

  public updateUserAvatar(data: File | Blob) {
    return FetchApi.put<TUser>('/user/profile/avatar', {}, data)
  }
}

export default new UserAPI()
