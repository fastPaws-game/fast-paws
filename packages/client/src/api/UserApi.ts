import FetchApi from '../utils/fetchApi'
import { TProfile } from '../models/ProfileModel'
import { TChangingPasswords } from '../models/PasswordsModel'

class UserApi {
  public getUser() {
    return FetchApi.get('/auth/user')
  }

  public updateUser(data: TProfile) {
    return FetchApi.put('/user/profile', { body: data })
  }

  public updatePassword(data: TChangingPasswords) {
    return FetchApi.put('/user/password', { body: data })
  }

  public updateUserAvatar(data: FormData) {
    return FetchApi.putData('/user/profile/avatar', { body: data })
  }
}

export default new UserApi()
