import RegistrationForm from '../../components/RegistrationForm'
import ContrastingWrapper from '../../components/ContrastingWrapper'
import { registration } from '../../store/auth/AuthActions'
import { H3 } from '../../assets/styles/texts'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { TSignUpFormValues } from '../../models/RegistrationModel'
import { authSelectors } from '../../store/auth/AuthSelectors'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Routes } from '../../constants/routes'

const Registration = () => {
  const dispatch = useAppDispatch()

  //TODO вынести логику в хук или НОС (переход на протектид роуты)
  const isAuth = useAppSelector(authSelectors.getIsAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate(Routes.HOME)
  }, [isAuth])

  const handleSubmit = async (data: TSignUpFormValues) => {
    dispatch(registration(data))

  }

  return (
    <ContrastingWrapper padding='25px'>
      <H3 accent weight="700">
        Sign up
      </H3>
      <RegistrationForm handleRegistration={handleSubmit} />
    </ContrastingWrapper>
  )
}

export default Registration
