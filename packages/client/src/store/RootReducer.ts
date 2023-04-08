import { combineReducers } from '@reduxjs/toolkit'
import userSlice from './user'
import { signUpSlice } from '../modules/authModule'


export const rootReducer = combineReducers({
  user: userSlice,
  auth: signUpSlice
})
