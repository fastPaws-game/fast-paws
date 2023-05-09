import React, { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { Routes } from '../constants/routes'
import { useAppSelector } from '../hooks/store'
import { authSelectors } from '../store/auth/AuthSelectors'

const RequireAuth: FC = () => {
  const location = useLocation()
  const isAuth = useAppSelector(authSelectors.getIsAuth)

  if (!isAuth) {
    return <Navigate to={Routes.SIGNIN} state={{ from: location }} replace />
  }
  return <Outlet />
}

export default RequireAuth
