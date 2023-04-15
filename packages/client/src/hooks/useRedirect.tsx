import { useLocation } from 'react-router'
import { Routes as routes } from '../constants/routes'
import { useAppSelector } from './store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const pathsToNeedAuth = [
  routes.MAIN,
  // routes.GAME,
  routes.FORUM,
  routes.LEADERBOARD,
  routes.SETTINGS,
]
const pathForAuth = [routes.SIGNUP, routes.HOME]

export const useRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuth = useAppSelector(store => store.auth.isAuth)

  useEffect(() => {
    const isAuthRequirePage = pathsToNeedAuth.includes(
      location.pathname as routes
    )
    const isAuthPages = pathForAuth.includes(location.pathname as routes)

    if (isAuthRequirePage && !isAuth) {
      navigate(routes.HOME)
    }
    if (isAuthPages && isAuth) {
      navigate(routes.MAIN)
    }
  }, [isAuth, location.pathname, navigate])
}
