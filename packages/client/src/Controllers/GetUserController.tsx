import GetUserApi from '../Api/getUserApi'
import { httpError } from '../errors/error'

export type User = {
  id: number | null
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export class GetUserController {
  async getUser() {
    try {
      const response = await GetUserApi.getUser()
      const result = await response.json()

      if (!response.ok) {
        const error = new httpError(`${result.reason}`)
        error.status = response.status
        throw error
      }

      return result
    } catch (e) {
      if (e instanceof httpError && e.status == 401) {
        console.log(e.message)
      } else if (e instanceof httpError && e.status == 400) {
        console.log(e.message)
      } else {
        throw e
      }
    }
  }
}

export default new GetUserController()
