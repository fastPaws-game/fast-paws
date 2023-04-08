import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthFormValues } from '../../../components/AuthForm'
import AuthApi from '../api/api'
import { InitialState } from '../../../store/types'
import { handleError } from '../../../utils/handleError'

type SignUpSlice = {
  isAuth: boolean
}

const initialState: InitialState<SignUpSlice> = {
  isAuth: false,
  status: 'initial',
  error: null
}

export const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers:
    (builder) => {
      builder
        .addCase(signIn.pending, (state) => {
          state.status = 'pending'
        })
        .addCase(signIn.fulfilled, (state) => {
          state.status = 'success'
          state.isAuth = true
          localStorage.setItem('isAuth', 'true')
        })
        .addCase(signIn.rejected, (state, action) => {
          state.status = 'error'
          state.error = handleError(action.payload)
        })
        .addCase(logOut.pending, (state) => {
          state.status = 'pending'
        })
        .addCase(logOut.fulfilled, (state) => {
          state.status = 'success'
          state.isAuth = false
          localStorage.setItem('isAuth', 'false')
        })
        .addCase(logOut.rejected, (state, action) => {
          state.status = 'error'
          state.error = handleError(action.payload)
          console.log(state.error)
        })
    }
})

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: AuthFormValues) => {
    try {
      return await AuthApi.signin(data)
    } catch (e) {
      console.log(e)
    }
  })

export const logOut = createAsyncThunk(
  'auth/logout',
  async () => {
    return await AuthApi.logout()
  })

export default signUpSlice.reducer
