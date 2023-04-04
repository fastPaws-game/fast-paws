import RegistrationForm from './RegistrationForm'
import ContrastingWrapper from '../../components/ContrastingWrapper'
import { registration } from './registrationApi'
import { H3 } from '../../assets/styles/texts'

const Registration = () => {
  return (
    <ContrastingWrapper padding={25}>
      <H3 accent weight='700'>
        Sign up
      </H3>
      <RegistrationForm handleRegistration={registration} />
    </ContrastingWrapper>
  )
}

export default Registration
