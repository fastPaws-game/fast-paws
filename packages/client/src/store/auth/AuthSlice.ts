import { RequestStatus } from '../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleError } from '../../utils/handleError'
import { AuthFormValues } from '../../components/AuthForm'
import { User } from '../../models/User'
import AuthApi from '../../api/AuthApi'
import UserApi from '../../api/UserApi'
import LocalStorage from '../../utils/localStorage'

type AuthSlice = {
  user: User | null
  isAuth: boolean
  signInStatus: RequestStatus
  signInError: string | null

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
      state.signInError  = null
      state.signInStatus = 'pending'
    },
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
  },
})

export const signInUser = createAsyncThunk(
  'user/signIn',
  async (body: AuthFormValues, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthApi.signin(body)
      if (response.status !== 200) {
        const error = await  response.json()
        return rejectWithValue(error.reason)
      }
      await dispatch(getUser())
      return
    } catch (e) {
      rejectWithValue(e)
    }
  }
)

export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthApi.logout()

    if (response.status !== 200) {
      const error = await  response.json()
      return rejectWithValue(error.reason)
    }
    return
  } catch (e) {
    rejectWithValue(e)
  }
})

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await UserApi.getUser()
    const data = await response.json()

    if (response.status !== 200) {
      return rejectWithValue(data)
    }

    return data
  } catch (e) {
    rejectWithValue(e)
  }
})

export const { setIsAuth, resetSignInError } = authSlice.actions

export default authSlice.reducer
