import AuthApi from './api'
import { AuthFormValues } from '../../components/AuthForm'

export class AuthController {
  async signin(data: AuthFormValues) {
    try {
      const response = await AuthApi.signin(data)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(`Status: ${response.status}: ${result.reason}`);
      }

      //Todo логика авторизации переходим на нужную страницу

    } catch(e) {
      console.log(e)
      //Остаемяся на текущей странице, выводим ошибку
    }
  }
}

export default new AuthController()
