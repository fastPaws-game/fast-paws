import axios from 'axios'

const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

export class UserAPIRepository {
  constructor(private _cookieHeader: string | undefined) {}

  getUser = async (): Promise<any> => {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      headers: {
        cookie: this._cookieHeader,
      },
      withCredentials: true,
    })
    return data
  }
}
