import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUser } from '../../models/UserModel'
import {
  buildGetUser,
  buildLogOut,
  buildRegistration,
  buildServiceId,
  buildSignInUser,
  buildUpdateAvatar,
  buildUpdatePassword,
  buildUpdateUser,
} from './extraReducers'
import { initialState } from './initialState'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    resetSignInError: state => {
      state.signInError = null
      state.signInStatus = 'initial'
    },
    resetSignUpError: state => {
      state.signUpError = null
      state.signUpStatus = 'initial'
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    buildSignInUser(builder)
    buildServiceId(builder)
    buildRegistration(builder)
    buildLogOut(builder)
    buildGetUser(builder)
    buildUpdateAvatar(builder)
    buildUpdatePassword(builder)
    buildUpdateUser(builder)
  },
})

export const { setIsAuth, resetSignInError, resetSignUpError } = authSlice.actions

export default authSlice.reducer
