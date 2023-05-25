import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import {
  getServiceId,
  getUser,
  logOut,
  registration,
  signInUser,
  updateAvatar,
  updatePassword,
  updateUser,
} from './AuthActions'
import { handleError } from '../../utils/handleError'
import { ALREADY_LOGIN } from '../../constants/errors'
import { TUser } from '../../models/UserModel'
import { AuthSlice } from './types'

export const buildSignInUser = (builder: ActionReducerMapBuilder<AuthSlice>) =>
  builder
    .addCase(signInUser.pending, state => {
      state.signInStatus = 'pending'
    })
    .addCase(signInUser.fulfilled, state => {
      state.signInStatus = 'success'
      state.isAuth = true
      state.signInError = null
    })
    .addCase(signInUser.rejected, (state, action) => {
      state.signInStatus = 'error'
      state.signInError = handleError(action.payload)
      if (state.signInError === ALREADY_LOGIN) {
        state.isAuth = true
      }
    })

export const buildServiceId = (builder: ActionReducerMapBuilder<AuthSlice>) =>
  builder
    .addCase(getServiceId.pending, state => {
      state.serviceIdStatus = 'pending'
    })
    .addCase(getServiceId.fulfilled, state => {
      state.serviceIdStatus = 'success'
      state.serviceIdError = null
    })
    .addCase(getServiceId.rejected, (state, action) => {
      state.serviceIdStatus = 'error'
      state.serviceIdError = handleError(action.payload)
    })

export const buildRegistration = (builder: ActionReducerMapBuilder<AuthSlice>) =>
  builder
    .addCase(registration.pending, state => {
      state.signUpStatus = 'pending'
    })
    .addCase(registration.fulfilled, state => {
      state.signInStatus = 'success'
      state.signUpStatus = 'success'
      state.isAuth = true
      state.signInError = null
      state.signUpError = null
    })
    .addCase(registration.rejected, (state, action) => {
      state.signUpStatus = 'error'
      state.signUpError = handleError(action.payload)
    })

export const buildLogOut = (builder: ActionReducerMapBuilder<AuthSlice>) =>
  builder
    .addCase(logOut.pending, state => {
      state.logOutStatus = 'pending'
    })
    .addCase(logOut.fulfilled, state => {
      state.logOutStatus = 'success'
      state.isAuth = false
      state.logOutError = null
      state.user = null
    })
    .addCase(logOut.rejected, (state, action) => {
      state.logOutStatus = 'error'
      state.logOutError = handleError(action.payload)
    })

export const buildGetUser = (builder: ActionReducerMapBuilder<AuthSlice>) =>
  builder
    .addCase(getUser.pending, state => {
      state.userStatus = 'pending'
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.userStatus = 'success'
      state.user = action.payload ? (action.payload as TUser) : null
      state.isAuth = true
      state.userError = null
    })
    .addCase(getUser.rejected, (state, action) => {
      state.userStatus = 'error'
      state.isAuth = false
      state.user = null
      state.userError = handleError(action.payload)
    })

export const buildUpdateAvatar = (builder: ActionReducerMapBuilder<AuthSlice>) =>
  builder
    .addCase(updateAvatar.fulfilled, (state, action) => {
      state.userStatus = 'success'
      state.avatarStatus = 'success'
      state.avatarError = null
      state.user = action.payload
    })
    .addCase(updateAvatar.rejected, (state, action) => {
      state.avatarStatus = 'error'
      state.avatarError = handleError(action.payload)
    })

export const buildUpdatePassword = (builder: ActionReducerMapBuilder<AuthSlice>) =>
  builder
    .addCase(updatePassword.pending, state => {
      state.passwordStatus = 'pending'
    })
    .addCase(updatePassword.fulfilled, state => {
      state.passwordStatus = 'success'
      state.passwordError = null
    })
    .addCase(updatePassword.rejected, (state, action) => {
      state.passwordStatus = 'error'
      state.passwordError = handleError(action.payload)
    })

export const buildUpdateUser = (builder: ActionReducerMapBuilder<AuthSlice>) =>
  builder
    .addCase(updateUser.pending, state => {
      state.userStatus = 'pending'
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.userStatus = 'success'
      state.user = state.user ? { ...state.user, ...action.payload } : null
      state.userError = null
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.userStatus = 'error'
      state.userError = handleError(action.payload)
    })
