import { useLocation } from 'react-router'
import { Routes } from '../constants/routes'
import { useAppSelector } from './store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { authSelectors } from '../store/auth/AuthSelectors'

const pathsRequireAuth = [Routes.FORUM, Routes.LEADERBOARD, Routes.SETTINGS]

const pathForAuth = [Routes.SIGNUP, Routes.SIGNIN, Routes.HOME]

export const useRedirect = async () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuth = useAppSelector(authSelectors.getIsAuth)

  useEffect(() => {
    const pathName = location.pathname as Routes
    const isAuthRequirePage = pathsRequireAuth.includes(pathName)
    const isAuthPages = pathForAuth.includes(pathName)

    if (isAuthRequirePage && !isAuth) {
      navigate(Routes.SIGNIN)
    }
    if (isAuthPages && isAuth) {
      navigate(Routes.HOME)
    }
  }, [location.pathname, isAuth, navigate])
}
