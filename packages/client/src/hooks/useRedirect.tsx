import { useLocation } from 'react-router'
import { Routes as routes } from '../constants/routes'
import { useAppSelector } from './store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const pathsToNeedAuth = [routes.MAIN, routes.GAME, routes.FORUM, routes.LEADERBOARD, routes.SETTINGS]
export const useRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuth = useAppSelector((store) => store.auth.isAuth)

  useEffect(() => {
    if (pathsToNeedAuth.includes(location.pathname as routes) && !isAuth) {
      navigate(routes.HOME)
    }
  }, [isAuth, location.pathname, navigate])

}
