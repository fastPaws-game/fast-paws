import { createAsyncThunk } from '@reduxjs/toolkit'
import { TProfile } from '../../models/ProfileModel'
import UserApi from '../../api/UserApi'

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
