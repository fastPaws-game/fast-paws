import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './RootReducer'

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
})

export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
