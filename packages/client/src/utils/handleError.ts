import { httpError } from '../errors/error'

const BASE_ERROR = 'Sorry, something wrong'
export const handleError = (error: unknown) => {
  if (error instanceof httpError) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    console.error('error', error)
    return BASE_ERROR
  }
}
