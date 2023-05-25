import { TUser } from '../../models/UserModel'
import { RequestStatus } from '../types'

export type AuthSlice = {
  user: TUser | null
  isAuth: boolean
  signInStatus: RequestStatus
  signInError: string | null

  signUpStatus: RequestStatus
  signUpError: string | null

  logOutStatus: RequestStatus
  logOutError: string | null

  avatarStatus: RequestStatus
  avatarError: string | null

  userStatus: RequestStatus
  userError: string | null

  serviceIdStatus: RequestStatus
  serviceIdError: string | null

  passwordStatus: RequestStatus
  passwordError: string | null
}
