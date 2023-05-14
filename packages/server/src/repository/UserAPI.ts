import fetch, { Headers, RequestInit } from 'node-fetch'
const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

const requestHeaders = new Headers()
requestHeaders.set('Content-Type', 'application/json')

export class UserAPIRepository {
  constructor(private _cookieHeader: string | undefined) {}

  getUser = async (): Promise<unknown> => {
    if (this._cookieHeader) requestHeaders.set('cookie', this._cookieHeader)

    const params = {
      method: 'GET',
      withCredentials: true,
      headers: requestHeaders,
    }
    try {
      const res = await fetch(`${API_ROOT}/auth/user`, params as RequestInit)

      const data = await res.json()

      if (res.status === 200) {
        return data
      } else {
        throw new Error(data.reason)
      }
    } catch (e) {
      if (e instanceof Error) {
        return Promise.reject(e.message)
      }
      return Promise.reject(e)
    }
  }
}
