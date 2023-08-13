import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthApi from '../../api/AuthApi'
import UserApi from '../../api/UserApi'
import { TSignIn } from '../../models/SignInModel'
import { TProfile } from '../../models/ProfileModel'
import { TSignUpFormValues } from '../../models/RegistrationModel'
import OAuthApi from '../../api/OAuthApi'
import { IUserService } from '../../services/userService'
import { TChangingPasswords } from '../../models/PasswordsModel'

export const updateUser = createAsyncThunk('user/updateUser', async (body: TProfile, { rejectWithValue }) => {
  try {
    return await UserApi.updateUser(body)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const updateAvatar = createAsyncThunk('user/updateAvatar', async (data: File | Blob, { rejectWithValue }) => {
  try {
    return await UserApi.updateUserAvatar(data)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (data: TChangingPasswords, { rejectWithValue }) => {
    try {
      return await UserApi.updatePassword(data)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const signInUser = createAsyncThunk(
  'user/signIn',
  async (body: TSignIn | string, { dispatch, rejectWithValue }) => {
    try {
      if (typeof body === 'string') {
        await OAuthApi.signin(body)
      } else {
        await AuthApi.signin(body)
      }

      return dispatch(getUser())
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getServiceId = createAsyncThunk('auth/getServiceId', async (_, { rejectWithValue }) => {
  try {
    const response = await OAuthApi.getServiceId()
    const { service_id: serviceId } = response
    location.href = OAuthApi.getOAuthUrl(serviceId as string)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await AuthApi.logout()
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue, extra }) => {
  const service: IUserService = extra as IUserService
  try {
    return await service.getCurrentUser()
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const registration = createAsyncThunk(
  'auth/signup',
  async (body: TSignUpFormValues, { dispatch, rejectWithValue }) => {
    try {
      await AuthApi.signup(body)
      await dispatch(getUser())
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
