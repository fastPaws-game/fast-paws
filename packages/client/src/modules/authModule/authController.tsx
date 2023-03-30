import AuthApi from './api'
import { AuthFormValues } from '../../components/AuthForm'
import { httpError } from '../../errors/error'
import GetUserController from '../../Controllers/GetUserController'
import { User } from '../../Controllers/GetUserController'

type AuthContextType = {
  user: User,
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
  async signin(data: AuthFormValues) {
    try {
      const response = await AuthApi.signin(data);

      if (!response.ok) {
        const result = await response.json();
        const error = new httpError(`${result.reason}`);
        error.status = response.status;
        throw error;
      }
  
      AuthContext.isAuth = true;
      const user = await GetUserController.getUser();
      AuthContext.user = user;
      //Todo переходим на нужную страницу

    } catch(e) {
      if(e instanceof httpError && e.status == 401) {
        console.log(e.message);
      } else if(e instanceof httpError && e.status == 400) {
        console.log(e.message);
      } else {
        throw e;
      }
    }
  }

  async getUser() {
    const user = await GetUserController.getUser()
    AuthContext.user = user
  }

  async logout() {
    try {
      const response = await AuthApi.logout();
      
      if (!response.ok) {
        const result = await response.json();
        const error = new httpError(`${result.reason}`);
        error.status = response.status;
        throw error;
      }

      AuthContext.isAuth = false;
    } catch(e) {
      if(e instanceof httpError && e.status == 401) {
        console.log(e.message);
      } else if(e instanceof httpError && e.status == 400) {
        console.log(e.message);
      } else {
        throw e;
      }
    }
  }
}

export default new AuthController()
