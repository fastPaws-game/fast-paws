import baseApiConfigConnection from '../constants/baseApiConfigConnection'

const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options<T> = {
  body?: T | undefined
  isFormData?: boolean
} & Omit<RequestInit, 'body'>

type Request<T> = (url: string, options?: Options<T>) => Promise<Response>

const configOptions = {
  method: METHODS.GET,
  credentials: 'include' as RequestCredentials | undefined,
  headers: baseApiConfigConnection.headers,
}

export class FetchApi {
  static API_URL = baseApiConfigConnection.url

  getApiUrl = () => {
    return FetchApi.API_URL
  }

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

  public put: Request<unknown> = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    const { body } = options
    return fetch(buildedUrl, {
      ...options,
      ...configOptions,
      credentials: 'include' as RequestCredentials | undefined,
      //withCredentials: true,
      method: METHODS.PUT,
      body: JSON.stringify(body),
    })
  }

  public putData: Request<FormData> = async (url: string, options = {}) => {
    const buildedUrl = this.buildUrl(url)
    const { body } = options
    return fetch(buildedUrl, {
      ...options,
      credentials: 'include' as RequestCredentials | undefined,
      method: METHODS.PUT,
      body,
    })
  }
}

export default new FetchApi()
