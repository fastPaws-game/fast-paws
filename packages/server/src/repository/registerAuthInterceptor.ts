import axios, { Axios as AxiosType } from 'axios'

export function registerAuthInterceptor(axiosInstance: AxiosType) {
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(new Error(error.response.data.reason))
      }
      return Promise.reject(error)
    }
  )
}
