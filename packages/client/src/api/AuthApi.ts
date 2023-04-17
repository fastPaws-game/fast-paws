import FetchApi from '../utils/fetchApi'
import { AuthFormValues } from '../components/AuthForm'
import { SignUpFormValues } from '../modules/registration/Registration'

class AuthApi {
  public signin(data: AuthFormValues) {
    return FetchApi.post('/auth/signin', { body: JSON.stringify(data) })
  }

  public logout() {
    return FetchApi.post('/auth/logout')
  }

  public signup(data:SignUpFormValues){
    return FetchApi.post('/auth/signup', { body: JSON.stringify(data) })
  }
}
export default new AuthApi()
