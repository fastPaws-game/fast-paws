import RegistrationForm from '../../components/RegistrationForm'
import ContrastingWrapper from '../../components/ContrastingWrapper'
import { registration } from '../../store/auth/AuthActions'
import { H3 } from '../../assets/styles/texts'
import { useAppDispatch } from '../../hooks/store'
import { TSignUpFormValues } from '../../models/RegistrationModel'

const Registration = () => {
  const dispatch = useAppDispatch()
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
