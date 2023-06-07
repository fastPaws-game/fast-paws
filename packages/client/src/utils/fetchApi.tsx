const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

type Options = {
  body?: Record<string, unknown> | FormData
}

type Request = <T>(url: string, options?: Options) => Promise<T>

export class FetchApi {
  static getURL = () => {
    throw new Error('Method not implemented.')
  }
  public API_URL: string

  constructor(apiUrl: string) {
    this.API_URL = apiUrl
  }
  public getURL() {
    return this.API_URL
  }

  public get: Request = async (url: string) => {
    return await baseFetch(this.API_URL + url, METHODS.GET)
  }

  public post: Request = async (url: string, options = {}) => {
    return await baseFetch(this.API_URL + url, METHODS.POST, options.body)
  }

  public delete: Request = async (url: string) => {
    return await baseFetch(this.API_URL + url, METHODS.DELETE)
  }

  public put: Request = async (url: string, options = {}) => {
    return await baseFetch(this.API_URL + url, METHODS.PUT, options.body)
  }

  public patch: Request = async (url: string, options = {}) => {
    return await baseFetch(this.API_URL + url, METHODS.PATCH, options.body)
  }
}

const FetchForumApi = new FetchApi('/api/v1')
export { FetchForumApi }

export const fetchApiV1 = new FetchApi('/api/v1')
export default new FetchApi('/api/v2')

const baseFetch = async (url: string, method: METHODS, body?: Record<string, any> | FormData) => {
  const isFormData = body instanceof FormData
  let bodyFetch: string | FormData = JSON.stringify(body)
  if (isFormData) {
    bodyFetch = body
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
    credentials: 'include',
    method,
    body: bodyFetch,
  })

  let result

  try {
    result = await response.json()
  } catch (e) {
    if (response.ok) {
      result = 'ok'
    }
  }

  if (!response.ok) {
    return Promise.reject(result.reason)
  }

  return result
}
