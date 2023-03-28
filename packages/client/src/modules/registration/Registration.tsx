import RegistrationForm from '../../components/RegistrationForm';
import AuthFormWrapper from '../../components/AuthFormWrapper';
import { registration } from './api';

const Registration = () => {
	return (
		<AuthFormWrapper title='Sign up'>
			<RegistrationForm handleRegistration={registration}/>
		</AuthFormWrapper>
	);
}

export default Registration;
