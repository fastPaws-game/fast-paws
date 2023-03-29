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
type Request = (url: string, options?: Options) => Promise<Response>

export class fetchApi {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${fetchApi.API_URL}${endpoint}`;
  }

  public get: Request = async (partUrl: string, options = {}) => {
    const url = this.endpoint + partUrl;
    return fetch(url, {
      ...options,
      method: METHODS.GET,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    });
  }

  public post: Request = async (partUrl: string, options = {}) => {
    const url = this.endpoint + partUrl;
    return fetch(url, {
      ...options,
      method: METHODS.POST,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    });
  }
}
