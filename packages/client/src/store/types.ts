import { RootState } from ".";

export type RequestStatus = 'initial' | 'pending' | 'success' | 'error'

declare global {
  interface Window {
    initialState?: RootState  }
}
