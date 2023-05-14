import axios, { Axios as AxiosType } from 'axios'

export function registerAuthInterceptor(api: AxiosType) {
  api.interceptors.response.use(
    response => response,
    error => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return Promise.reject(new Error(error.response.data.reason))
        }
      }

      return Promise.reject(error)
    }
  )
}
