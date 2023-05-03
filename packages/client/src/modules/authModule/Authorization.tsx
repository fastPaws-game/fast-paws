import AuthForm from '../../components/AuthForm'
import ContrastingWrapper from '../../components/ContrastingWrapper'
import { useAppDispatch } from '../../hooks/store'
import { TSignIn } from '../../models/SignInModel'
import { signInUser } from '../../store/auth/AuthActions'
import React from 'react'


const Authorization = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: TSignIn) => {
    dispatch(signInUser(data))
  }
  return (
    <ContrastingWrapper padding='25px'>
      <AuthForm onSubmitFrom={handleSubmit} />
    </ContrastingWrapper>
  )
}
export { Authorization }
