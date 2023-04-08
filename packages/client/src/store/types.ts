export type RequestStatus = 'initial' | 'pending' | 'success' | 'error'

export type InitialState<T> = T & {
  status: RequestStatus
  error: string | null
}
