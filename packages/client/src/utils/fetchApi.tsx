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
  static API_URL = '/api/v2'

  public get: Request = async (url: string) => {
    return await baseFetch(url, METHODS.GET)
  }

  public post: Request = async (url: string, options = {}) => {
    return await baseFetch(url, METHODS.POST, options.body)
  }

  public delete: Request = async (url: string) => {
    return await baseFetch(url, METHODS.DELETE)
  }

  public put: Request = async (url: string, options = {}) => {
    return await baseFetch(url, METHODS.PUT, options.body)
  }

  public patch: Request = async (url: string, options = {}) => {
    return await baseFetch(url, METHODS.PATCH, options.body)
  }
}

export default new FetchApi()

const baseFetch = async (url: string, method: METHODS, body?: Record<string, any> | FormData) => {
  const isFormData = body instanceof FormData
  let bodyFetch: string | FormData = JSON.stringify(body)
  if (isFormData) {
    bodyFetch = body
  }

  const response = await fetch(FetchApi.API_URL + url, {
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
