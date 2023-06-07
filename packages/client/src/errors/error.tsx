export class httpError extends Error {
  public status: null | number

  constructor(message: string) {
    super(message)
    this.name = 'httpError'
    this.status = null
  }
}

interface ErrorWithReason {
  reason: string
}

export function isErrorWithReason(error: any): error is ErrorWithReason {
  return error && error.reason
}
