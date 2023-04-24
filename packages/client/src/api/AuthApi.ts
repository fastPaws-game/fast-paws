import FetchApi from '../utils/fetchApi'
import { TSignIn } from '../models/SignInModel'
import { TSignUpFormValues } from '../models/RegistrationModel'
import { TProfile } from '../models/ProfileModel'

class AuthApi {
  public signin(data: TSignIn) {
    return FetchApi.post('/auth/signin', { body: JSON.stringify(data) })
  }

  public logout() {
    return FetchApi.post('/auth/logout')
  }

  public signup(data: TSignUpFormValues) {
    return FetchApi.post('/auth/signup', { body: JSON.stringify(data) })
  }
}
export default new AuthApi()
