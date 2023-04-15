import { useLocation } from 'react-router'
import { Routes } from '../constants/routes'
import { useAppSelector } from './store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const pathsRequireAuth = [
  Routes.MAIN,
  // Routes.GAME,
  Routes.FORUM,
  Routes.LEADERBOARD,
  Routes.SETTINGS,
]
const pathForAuth = [Routes.SIGNUP, Routes.HOME]

export const useRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuth = useAppSelector(store => store.auth.isAuth)

  useEffect(() => {
    const pathName = location.pathname as Routes
    const isAuthRequirePage = pathsRequireAuth.includes(pathName)

    const isAuthPages = pathForAuth.includes(pathName)

    if (isAuthRequirePage && !isAuth) {
      navigate(Routes.HOME)
    }
    if (isAuthPages && isAuth) {
      navigate(Routes.MAIN)
    }
  }, [isAuth, location.pathname, navigate])
}
