import { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'
import LocalStorage from '../utils/localStorage'

const RequireAuth: FC<PropsWithChildren> = props => {
  const { children } = props
  const location = useLocation()
  const isAuth = LocalStorage.get('isAuth')

  if (isAuth === 'false') {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default RequireAuth
