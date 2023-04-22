import { RootState } from '../index'

const getSignInError = (state: RootState) => state.auth.signInError
const getSignInStatus = (state: RootState) => state.auth.signInStatus
const getSignUpError = (state: RootState) => state.auth.signUpError
const getSignUpStatus = (state: RootState) => state.auth.signUpStatus
const getUser = (state: RootState) => state.auth.user
const getIsAuth = (state: RootState) => state.auth.isAuth
const getAvatar = (state: RootState) => state.auth.user?.avatar ? `https://ya-praktikum.tech/api/v2/resources${state.auth.user?.avatar}`:null

export const authSelectors = {
  getSignInError,
  getSignInStatus,
  getSignUpError,
  getSignUpStatus,
  getUser,
  getIsAuth,
  getAvatar
}
