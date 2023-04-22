import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import AuthForm from '../../components/AuthForm'
import { Routes } from '../../constants/routes'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { TSignIn } from '../../models/SignInModel'
import { signInUser } from '../../store/auth/AuthActions'
import { authSelectors } from '../../store/auth/AuthSelectors'

const Authorization = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(authSelectors.getIsAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate(Routes.HOME)
  }, [isAuth])

  const handleSubmit = async (data: TSignIn) => {
    dispatch(signInUser(data))
  }
  return <AuthForm onSubmitFrom={handleSubmit} />
}

export { Authorization }
