import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Input, { typeStyleInput } from '../ui/input';
import Button from '../ui/button';
import Link from '../ui/link';
import styled from 'styled-components';
import { routes } from '../constants/routes';
import { media } from '../assets/styles/media';
import { FC } from 'react';
import { SignUpFormValues } from '../modules/registration/api';

//TODO добавить валидацию

const defaultValuesSignUpForm = {
    login: '',
    email: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    repeated_password: ''
}

type Props = {
    handleRegistration: (values: SignUpFormValues) => void;
}

const RegistrationForm: FC<Props> = (props) => {

    const { handleRegistration } = props
    const {
        register,
        reset,
        handleSubmit,
    } = useForm({
        defaultValues: defaultValuesSignUpForm,
    });

    const onSubmit: SubmitHandler<SignUpFormValues> = (data: SignUpFormValues) => {
        alert(JSON.stringify(data));
        handleRegistration(data );
        reset();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Column>
                <Input placeholder="Login" typeStyle={typeStyleInput.form} id="login" {...register('login')} />
                <Input placeholder="Email" typeStyle={typeStyleInput.form} id="email" {...register('email')} />
                <Input placeholder="Name" typeStyle={typeStyleInput.form} id="name"   {...register('first_name')} />
                <Input placeholder="Surname" typeStyle={typeStyleInput.form}  {...register('second_name')} id="surname" {...register} />
            </Column>
            <Column>
                <Input placeholder="Phone" typeStyle={typeStyleInput.form}  {...register('phone')} id="phone" {...register} />
                <Input placeholder="Password" typeStyle={typeStyleInput.form}  {...register('password')} id="password" {...register} />
                <Input placeholder="Repeat password" typeStyle={typeStyleInput.form} {...register('repeated_password')} id="repeated_password" {...register} />
                <Button type='submit'>Sign up</Button>
                <Link to={routes.signin}>Log in</Link>
            </Column>
        </Form>
    );
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

    ${media.middle} {
        flex-direction: row;
        align-items: flex-start;
        padding-top: 30px;
        min-width: 100%;
    }
    ${media.small} {
        flex-direction: column;
        align-items: center;
    }
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin: 10px;
	align-items: center;
	justify-content: space-between;
    width: 100%;

    & div{
        width: 100%;
        text-align: center;
    }
	& button{
		margin-top: 15px;
		margin-bottom: 4px;
	}
    
`;
export default RegistrationForm;
