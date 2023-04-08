import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InitialState } from '../types'
import { handleError } from '../../utils/handleError'
import { User } from '../../models/user'
import FetchApi from '../../utils/fetchApi'

type UserSlice = {
  userInfo: User
}
export const initialState: InitialState<UserSlice> = {
  userInfo: {
    id: null,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: ''
  },
  status: 'initial',
  error: null
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'success'
        state.userInfo = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = handleError(action.payload)
      })
  }
})

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    return await FetchApi.get<User>('/auth/user')
  }
)
export default userSlice.reducer
