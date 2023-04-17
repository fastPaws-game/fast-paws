const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: string
  body?: null | string
  headers?: Headers
}
type Request = <T>(url: string, options?: Options) => Promise<Response>

export class FetchApi {
  static API_URL = 'https://ya-praktikum.tech/api/v2'

  private buildUrl = (path: string) => {
    return FetchApi.API_URL + path
  }

  public get: Request = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    return fetch(buildedUrl, {
      ...options,
      method: METHODS.GET,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }

  public post: Request = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    return fetch(buildedUrl, {
      ...options,
      method: METHODS.POST,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }

  public put: Request = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    return fetch(buildedUrl, {
      ...options,
      method: METHODS.PUT,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }
}

export default new FetchApi()
