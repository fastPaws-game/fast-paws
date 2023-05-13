import { rootReducer } from './RootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { UserServiceType } from '../services/userService'

export type RootState = ReturnType<typeof rootReducer>

export function createStore(service: UserServiceType, initialState?: RootState) {
  const store = configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      })
    },
  })

  return { store }
}
