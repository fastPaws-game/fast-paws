import { AuthSlice } from './types'

export const initialState: AuthSlice = {
  user: null,
  isAuth: false,

  signInStatus: 'initial',
  signInError: null,

  signUpStatus: 'initial',
  signUpError: null,

  logOutStatus: 'initial',
  logOutError: null,

  avatarStatus: 'initial',
  avatarError: null,

  userStatus: 'initial',
  userError: null,

  serviceIdStatus: 'initial',
  serviceIdError: null,

  passwordStatus: 'initial',
  passwordError: null,
}
