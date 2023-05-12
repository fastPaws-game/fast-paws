import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthApi from '../../api/AuthApi'
import UserApi from '../../api/UserApi'
import { TSignIn } from '../../models/SignInModel'
import { TProfile } from '../../models/ProfileModel'
import { TSignUpFormValues } from '../../models/RegistrationModel'
import OAuthApi from '../../api/OAuthApi'
import { IUserService } from '../../services/userService'

export const updateUser = createAsyncThunk('user/updateUser', async (body: TProfile, { rejectWithValue }) => {
  try {
    const response = await UserApi.updateUser(body)
    if (response.status !== 200) {
      const error = await response.json()
      return rejectWithValue(error.reason)
    }
    const res = await response.json()
    return res
  } catch (e) {
    rejectWithValue(e)
  }
})

export const updateAvatar = createAsyncThunk('user/updateAvatar', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await UserApi.updateUserAvatar(data)

    if (response.status !== 200) {
      const error = await response.json()
      return rejectWithValue(error.reason)
    } else {
      const res = await response.json()
      return res
    }
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const signInUser = createAsyncThunk(
  'user/signIn',
  async (body: TSignIn | string, { dispatch, rejectWithValue }) => {
    try {
      const response = typeof body === 'string' ? await OAuthApi.signin(body) : await AuthApi.signin(body)
      if (response.status !== 200) {
        const error = await response.json()
        return rejectWithValue(error.reason)
      }
      await dispatch(getUser())
    } catch (e) {
      rejectWithValue(e)
    }
  }
)

export const getServiceId = createAsyncThunk('auth/getServiceId', async (_, { rejectWithValue }) => {
  try {
    const response = await OAuthApi.getServiceId()
    if (response.status !== 200) {
      const error = await response.json()
      return rejectWithValue(error.reason)
    } else {
      const { service_id: serviceId } = await response.json()
      location.href = OAuthApi.getOAuthUrl(serviceId)
    }
  } catch (e) {
    rejectWithValue(e)
  }
})

export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthApi.logout()

    if (response.status !== 200) {
      const error = await response.json()
      return rejectWithValue(error.reason)
    }
  } catch (e) {
    rejectWithValue(e)
  }
})

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue, extra }) => {
  const service: IUserService = extra as IUserService
  try {
    const response = await service.getCurrentUser()
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
  async (body: TSignUpFormValues, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthApi.signup(body)
      if (response.status !== 200) {
        const error = await response.json()
        return rejectWithValue(error.reason)
      }
      await dispatch(getUser())
    } catch (e) {
      rejectWithValue(e)
    }
  }
)
