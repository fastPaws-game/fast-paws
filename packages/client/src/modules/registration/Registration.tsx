import RegistrationForm from '../../components/RegistrationForm'
import ContrastingWrapper from '../../components/ContrastingWrapper'
import { registration } from '../../store/auth/AuthActions'
import { H3 } from '../../assets/styles/texts'
import { useAppDispatch } from '../../hooks/store'

export type SignUpFormValues = {
  login: string
  email: string
  first_name: string
  second_name: string
  phone: string | number
  password: string
  repeated_password: string
}

const Registration = () => {
  const dispatch = useAppDispatch()
  const handleSubmit = async (data: SignUpFormValues) => {
    console.log(registration)
    dispatch(registration(data))
  }

  return (
    <ContrastingWrapper padding={25}>
      <H3 accent weight="700">
        Sign up
      </H3>
      <RegistrationForm handleRegistration={handleSubmit} />
    </ContrastingWrapper>
  )
}

export default Registration
