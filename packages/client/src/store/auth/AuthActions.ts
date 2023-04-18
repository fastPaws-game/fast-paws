import { createAsyncThunk } from '@reduxjs/toolkit'
import { authSlice } from './AuthSlice'
import AuthApi from '../../api/AuthApi'
import UserApi from '../../api/UserApi'
import { AuthFormValues } from '../../components/AuthForm'
import { ProfileFormValuesType } from '../../components/ProfileForm'
import { SignUpFormValues } from '../../modules/registration/Registration'

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (body: ProfileFormValuesType, { dispatch, rejectWithValue }) => {
    try {
      const response = await UserApi.updateUser(body)
      if (response.status !== 200) {
        const error = await response.json()
        return rejectWithValue(error.reason)
      }
      return body
    } catch (e) {
      rejectWithValue(e)
    }
  }
)
export const signInUser = createAsyncThunk(
  'user/signIn',
  async (body: AuthFormValues, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthApi.signin(body)
      if (response.status !== 200) {
        const error = await response.json()
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
      const error = await response.json()
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
export const registration = createAsyncThunk(
  'auth/signup',
  async (body: SignUpFormValues, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthApi.signup(body)
      if (response.status !== 200) {
        const error = await response.json()
        return rejectWithValue(error.reason)
      }
      await dispatch(getUser())
      return
    } catch (e) {
      rejectWithValue(e)
    }
  }
)
/*
return result.then(data => {
  //TODO заменить на new httpError, когда Ильфат сольет МР
  const message = `Что-то пошло не так... ${data.message}`
  return Promise.reject(new Error(message))
})
}
} catch (err) {
console.log(err)
}
})
*/

export const { setIsAuth, resetSignInError, resetSignUpError } = authSlice.actions
