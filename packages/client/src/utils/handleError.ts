import { httpError, isErrorWithReason } from '../errors/error'

const BASE_ERROR = 'Sorry, something wrong'
export const handleError = (error: unknown) => {
  if (error instanceof httpError) {
    return error.message
  } else if (isErrorWithReason(error)) {
    return error.reason
  } else if (typeof error === 'string') {
    return error
  } else {

    return BASE_ERROR
  }
}
