import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Input from '../ui/input';
import Button from '../ui/button';
import Link from '../ui/link';
import styled, { ThemeProvider } from 'styled-components';
import ErrorBoundary from '../components/ErrorBoundary';
import ProfileAvatar from '../components/ProfileAvatar';
import { useChangeTheme } from '../hooks/useChangeTheme';
import BaseLayout from '../layouts/BaseLayout';
// import { media } from '../assets/styles/media';
import { H3 } from '../assets/styles/texts';

const defaultValues={
	first_name:		'',
	second_name:	'',
	display_name:	'',	//first_name+' '+second_name,
	login:			'',
	email:			'',
	phone:			'',
}

const validation={
	first_name:		{minLength:3, pattern: /^[A-Za-zА-Яа-яЁё]+$/i},
	second_name:	{minLength:3, pattern: /^[A-Za-zА-Яа-яЁё]+$/i},
	display_name:	{minLength:3, pattern: /^[A-Za-zА-Яа-яЁё0-9_]+\s?[A-Za-zА-Яа-яЁё0-9_]+$/},
	login:			{minLength:3, pattern: /^[A-Za-z0-9_]+$/, required: true},
	email:			{pattern: /^[A-Za-z._\-[0-9]+[@][A-Za-z._\-[0-9]+[.][a-z]{2,4}$/, required: true},
	phone:			{pattern: /^[+]?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/},
}

const ProfilePage = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({defaultValues});
	const { theme, themeToggler } = useChangeTheme()

	//Profile change
	const onSubmit:SubmitHandler<FieldValues> = (data) => {
		alert(JSON.stringify(data));
	};

	return (
		<BaseLayout>
		<ErrorBoundary>
			<Wrapper>
			<H3>Profile</H3>
			<Profile>
			<form onSubmit={handleSubmit(onSubmit)}>
			<FormFields>
				<Input id='first_name' typeStyle='profile' placeholder='First name'
					{...errors.first_name && {errorOn:true, errorMessage:'Name is incorrect'}}
					{...register('first_name', validation.first_name)}/>
				<Input id='second_name' typeStyle='profile' placeholder='Second name'
					{...errors.second_name && {errorOn:true, errorMessage:'Name is incorrect'}}
					{...register('second_name', validation.second_name)}/>
				<Input id='display_name' typeStyle='profile' placeholder='Display name'
					{...errors.display_name && {errorOn:true, errorMessage:'Name is incorrect'}}
					{...register('display_name', validation.display_name)}/>
				<Input id='login' typeStyle='profile' placeholder='Login*'
					{...errors.login && {errorOn:true, errorMessage:'Login is incorrect'}}
					{...register('login', validation.login)}/>
				<Input id='email' typeStyle='profile' placeholder='E-mail*'
					{...errors.email && {errorOn:true, errorMessage:'Wrong e-mail'}}
					{...register('email', validation.email)}/>
				<Input id='phone' typeStyle='profile' placeholder='Phone'
					{...errors.phone && {errorOn:true, errorMessage:'Wrong phone number'}}
					{...register('phone', validation.phone)}/>
				<Button type='submit'>Update</Button>
				<Link to={'#'}>Change password</Link>
			</FormFields>
			</form>
			<Settings>
				<ProfileAvatar/>
				<div><input type={'checkbox'} onClick={themeToggler}/><label> Dark theme</label></div> {/* ToDo: Theme check state */}
			</Settings>
			</Profile>
		</Wrapper>
		</ErrorBoundary>
		</BaseLayout>
	);
}

const FormFields = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin: 10px;
	align-items: center;
`;

const Settings=styled.div`
	width: 120px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin: 10px;
`;

const Profile=styled.div`
	display: flex;
	justify-content: center;
`;

const Wrapper = styled.div`
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.secondary};
	box-shadow: ${({ theme }) => theme.shadows.secondary};
	padding: 25px;
	& h3{text-align: center}
`;

export default ProfilePage;
