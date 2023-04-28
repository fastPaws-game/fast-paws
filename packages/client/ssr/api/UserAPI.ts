import axios from 'axios'

interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string | null
  email: string
  phone: string | null
}

interface UserRepository {
  getCurrent(): Promise<User>
}

const REDIRECT_URI = 'http://localhost:3001'
const API_ROOT = `${REDIRECT_URI}/api/v2`

export class UserAPI implements UserRepository {
  async getCurrent(): Promise<User> {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      withCredentials: true,
    })
    return data
  }
}

export class UserService {
  constructor(private _repo: UserRepository) {}
  getCurrentUser() {
    return this._repo.getCurrent()
  }
}
