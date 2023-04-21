import { useLocation } from 'react-router'
import { Routes } from '../constants/routes'
import { useAppDispatch } from './store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getUser } from '../store/auth/AuthActions'

const pathsRequireAuth = [
  Routes.FORUM,
  Routes.LEADERBOARD,
  Routes.SETTINGS,
  Routes.HOME
]

const pathForAuth = [Routes.SIGNUP, Routes.SIGNIN]

export const useRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  let isAuth: boolean

  useEffect(() => {
    (async () => {
      await dispatch(getUser())
        .unwrap()
        .then(() => {
          isAuth = true
        })
        .catch(() => {
          isAuth = false
        })

      const pathName = location.pathname as Routes
      const isAuthRequirePage = pathsRequireAuth.includes(pathName)
      const isAuthPages = pathForAuth.includes(pathName)

      if (isAuthRequirePage && !isAuth) {
        navigate(Routes.SIGNIN)
      }
      if (isAuthPages && isAuth) {
        navigate(Routes.HOME)
      }
    })()
  }, [])

}
