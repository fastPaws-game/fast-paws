import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth/AuthSlice'
import themeSlice from './theme/ThemeSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
})
