import FetchApi from '../utils/fetchApi'
import { AuthFormValues } from '../components/AuthForm'

class AuthApi {
  public signin(data: AuthFormValues) {
    return FetchApi.post('/auth/signin', { body: JSON.stringify(data) })
  }

  public logout() {
    return FetchApi.post('/auth/logout')
  }
}

export default new AuthApi()
