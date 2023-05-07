import FetchApi from '../utils/fetchApi'
import { TSignIn } from '../models/SignInModel'
import { TSignUpFormValues } from '../models/RegistrationModel'

class AuthApi {
  public signin(data: TSignIn) {
    return FetchApi.post('/auth/signin', { body: data })
  }

  public logout() {
    return FetchApi.post('/auth/logout')
  }

  public signup(data: TSignUpFormValues) {
    return FetchApi.post('/auth/signup', { body: data })
  }
}

export default new AuthApi()
