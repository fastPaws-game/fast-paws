import axios from 'axios'

const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

export default class UserAPI {
  constructor(private _cookieHeader: string | undefined) {}

  async getUser(): Promise<any> {
    try {
      const { data } = await axios.get(`${API_ROOT}/auth/user`, {
        headers: { cookie: this._cookieHeader },
        withCredentials: true,
      })
      return data
    } catch (err: any) {
      console.log('cookie:', this._cookieHeader)
      console.log('Fetch user data:', err.response.data)
    }
  }
}
