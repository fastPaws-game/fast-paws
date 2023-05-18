import baseApiConfigConnection from '../constants/baseApiConfigConnection'

const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

type Options = {
  isFormData?: boolean
} & RequestInit

type Request<T> = (url: string, options?: Options) => Promise<Response>

const configOptions = {
  method: METHODS.GET,
  credentials: 'include' as RequestCredentials | undefined,
  headers: baseApiConfigConnection.headers,
}

export class FetchApi {
  static API_URL = baseApiConfigConnection.url

  private buildUrl = (path: string) => {
    return FetchApi.API_URL + path
  }

  public get: Request<undefined> = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    const res = await fetch(buildedUrl, {
      ...options,
      ...configOptions,
    })
    const result = await res.json()
    if (res.status !== 200 && res.status !== 304) {
      return Promise.reject(result.reason)
    }
    return result
  }

  public post: Request<unknown> = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    const { body = {}, ...otherOptions } = options
    return fetch(buildedUrl, {
      ...otherOptions,
      ...configOptions,
      method: METHODS.POST,
      body: JSON.stringify(body),
    })
  }

  public delete: Request<unknown> = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    return fetch(buildedUrl, {
      ...options,
      ...configOptions,
      method: METHODS.DELETE,
    })
  }

  public put: Request<unknown> = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    const { body } = options
    return fetch(buildedUrl, {
      ...options,
      ...configOptions,
      credentials: 'include',
      method: METHODS.PUT,
      body: JSON.stringify(body),
    })
  }

  public putData: Request<FormData> = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    const { body } = options
    return fetch(buildedUrl, {
      ...options,
      credentials: 'include',
      method: METHODS.PUT,
      body,
    })
  }

  public patch: Request<unknown> = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    const { body } = options
    return fetch(buildedUrl, {
      ...options,
      ...configOptions,
      credentials: 'include',
      method: METHODS.PATCH,
      body: JSON.stringify(body),
    })
  }
}

export default new FetchApi()
