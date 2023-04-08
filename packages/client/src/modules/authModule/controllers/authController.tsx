import AuthApi from '../api/api'
import { AuthFormValues } from '../../../components/AuthForm'
import { httpError } from '../../../errors/error'
import GetUserController, { User } from '../../../Controllers/GetUserController'

type AuthContextType = {
  user: User
  isAuth: boolean
}

const AuthContext: AuthContextType = {
  user: {
    id: null,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: ''
  },
  isAuth: false
}

export class AuthController {
  async signin(data: AuthFormValues, navigate: () => void) {
    try {
      const response = await AuthApi.signin(data)

      if (!response.ok) {
        const result = await response.json()
        const error = new httpError(`${result.reason}`)
        error.status = response.status
        throw error
      }

      AuthContext.isAuth = true
      localStorage.setItem('isAuth', 'true')
      const user = await GetUserController.getUser()
      AuthContext.user = user
      navigate()
    } catch (e) {
      if (e instanceof httpError && e.status == 401) {
        console.log(e.message)
      } else if (e instanceof httpError && e.status == 400) {
        console.log(e.message)
      } else {
        throw e
      }
    }
  }

  async getUser() {
    const user = await GetUserController.getUser()
    AuthContext.user = user
  }

  async logout(navigate: () => void) {
    try {
      const response = await AuthApi.logout()

      if (!response.ok) {
        const result = await response.json()
        const error = new httpError(`${result.reason}`)
        error.status = response.status
        throw error
      }

      AuthContext.isAuth = false
      localStorage.setItem('isAuth', 'false')
      navigate()
    } catch (e) {
      if (e instanceof httpError && e.status == 401) {
        console.log(e.message)
      } else if (e instanceof httpError && e.status == 400) {
        console.log(e.message)
      } else {
        throw e
      }
    }
  }
}

export default new AuthController()
