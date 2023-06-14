import axios from 'axios'
import { registerAuthInterceptor } from './registerAuthInterceptor'

const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

const axiosInstance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
})

registerAuthInterceptor(axiosInstance)

export interface UserRepository {
  getUser(): Promise<unknown>
}

export class UserAPIRepository {
  constructor(private _cookieHeader: string | undefined) {}

  getUser = async (): Promise<unknown> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axiosInstance.get(`${API_ROOT}/auth/user`, {
        headers: {
          cookie: this._cookieHeader,
        },
      })
      return data
    } catch (error) {
      throw error
    }
  }
}
