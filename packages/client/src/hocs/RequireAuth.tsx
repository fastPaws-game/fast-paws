import { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'
import { Routes } from '../constants/routes'
import { useAppSelector } from '../hooks/store'
import { authSelectors } from '../store/auth/AuthSelectors'

const RequireAuth: FC<PropsWithChildren> = props => {
  const { children } = props
  const location = useLocation()
  const isAuth =  useAppSelector(authSelectors.getIsAuth)

  if (!isAuth) {
    return <Navigate to={Routes.SIGNIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default RequireAuth
