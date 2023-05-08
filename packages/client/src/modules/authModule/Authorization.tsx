import AuthForm from '../../components/AuthForm'
import ContrastingWrapper from '../../components/ContrastingWrapper'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { TSignIn } from '../../models/SignInModel'
import { signInUser } from '../../store/auth/AuthActions'
import React, { useEffect } from 'react'
import { authSelectors } from '../../store/auth/AuthSelectors'
import { ALREADY_LOGIN } from '../../constants/errors'
import { useNavigate } from 'react-router'
import { Routes } from '../../constants/routes'
import { resetSignInError } from '../../store/auth/AuthSlice'


const Authorization = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const getSignInError = useAppSelector(authSelectors.getSignInError)
  
  const handleSubmit = async (data: TSignIn) => {
    dispatch(signInUser(data))
  }

  useEffect(() => {
    if (getSignInError === ALREADY_LOGIN) {
      navigate(Routes.HOME)
      dispatch(resetSignInError())
    }
  }, [getSignInError, navigate])

  return (
    <ContrastingWrapper padding='25px'>
      <AuthForm onSubmitFrom={handleSubmit} />
    </ContrastingWrapper>
  )
}
export { Authorization }
