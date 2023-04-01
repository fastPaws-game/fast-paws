export class httpError extends Error {
  public status: null | number

  constructor(message: string) {
    super(message)
    this.name = 'httpError'
    this.status = null
  }
}
