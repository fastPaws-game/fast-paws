import { RequestStatus } from '../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleError } from '../../utils/handleError'
import { User } from '../../models/User'
import LocalStorage from '../../utils/localStorage'
import { getUser, logOut, registration, signInUser, updateUser } from './AuthActions'

type AuthSlice = {
  user: User | null
  isAuth: boolean
  signInStatus: RequestStatus
  signInError: string | null

  signUpStatus: RequestStatus
  signUpError: string | null

  logOutStatus: RequestStatus
  logOutError: string | null

  userStatus: RequestStatus
  userError: string | null
}

const initialState: AuthSlice = {
  user: null,
  isAuth: false,

  signInStatus: 'initial',
  signInError: null,

  signUpStatus: 'initial',
  signUpError: null,

  logOutStatus: 'initial',
  logOutError: null,

  userStatus: 'initial',
  userError: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    resetSignInError: (state) => {
      state.signInError = null
      state.signInStatus = 'pending'
    },
    resetSignUpError: (state) => {
      state.signUpError = null
      state.signUpStatus = 'pending'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signInUser.pending, state => {
        state.signInStatus = 'pending'
      })
      .addCase(signInUser.fulfilled, state => {
        state.signInStatus = 'success'
        state.isAuth = true
        state.signInError = null
        LocalStorage.set('isAuth', true)
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.signInStatus = 'error'
        state.signInError = handleError(action.payload)
      })
      .addCase(registration.pending, state => {
        state.signUpStatus = 'pending'
      })
      .addCase(registration.fulfilled, state => {
        state.signInStatus = 'success'
        state.signUpStatus = 'success'
        state.isAuth = true
        state.signInError = null
        state.signUpError = null
        LocalStorage.set('isAuth', true)
      })
      .addCase(registration.rejected, (state, action) => {
        state.signUpStatus = 'error'
        state.signUpError = handleError(action.payload)
      })
      .addCase(logOut.pending, state => {
        state.logOutStatus = 'pending'
      })
      .addCase(logOut.fulfilled, state => {
        state.logOutStatus = 'success'
        state.isAuth = false
        state.logOutError = null
        LocalStorage.set('isAuth', false)
      })
      .addCase(logOut.rejected, (state, action) => {
        state.logOutStatus = 'error'
        state.logOutError = handleError(action.payload)
      })
      .addCase(getUser.pending, state => {
        state.userStatus = 'pending'
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userStatus = 'success'
        state.user = action.payload
        state.userError = null
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userStatus = 'error'
        state.userError = handleError(action.payload)
      })

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
  },
})

export default authSlice.reducer
