import fetchApi from '../../utils/fetchApi'
import { RootState } from '../index'

const getSignInError = (state: RootState) => state.auth.signInError
const getSignInStatus = (state: RootState) => state.auth.signInStatus
const getSignUpError = (state: RootState) => state.auth.signUpError
const getSignUpStatus = (state: RootState) => state.auth.signUpStatus
const getUser = (state: RootState) => state.auth.user
const getUserError = (state: RootState) => state.auth.userError
const getUserStatus = (state: RootState) => state.auth.userStatus
const getIsAuth = (state: RootState) => state.auth.isAuth
const getAvatarError = (state: RootState) => state.auth.avatarError
const getAvatar = (state: RootState) =>
  state.auth.user?.avatar ? `${fetchApi.getApiUrl()}/resources${state.auth.user?.avatar}` : null

export const authSelectors = {
  getUserError,
  getUserStatus,
  getAvatarError,
  getSignInError,
  getSignInStatus,
  getSignUpError,
  getSignUpStatus,
  getUser,
  getIsAuth,
  getAvatar,
}
