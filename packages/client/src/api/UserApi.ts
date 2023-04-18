import FetchApi from '../utils/fetchApi'
import { TUser } from '../models/UserModel'
import { TProfile } from '../models/ProfileModel'
import { TChangingPasswords } from '../models/PasswordsModel'

class UserApi {
  public getUser() {
    return FetchApi.get<TUser>('/auth/user')
  }
  public updateUser(data: TProfile) {
    return FetchApi.put('/user/profile', { body: JSON.stringify(data) })
  }
  public updatePassword(data: TChangingPasswords) {
    return FetchApi.put('/user/password', { body: JSON.stringify(data) })
  }
}

export default new UserApi()
