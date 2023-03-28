import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Input from '../ui/input';
import Button from '../ui/button';
import Link from '../ui/link';
import styled, { ThemeProvider } from 'styled-components';
import ErrorBoundary from '../components/ErrorBoundary';
import { useChangeTheme } from '../hooks/useChangeTheme';
import { GlobalStyles } from '../assets/styles/globalStyle';
import { BrowserRouter } from 'react-router-dom';
// import { connect } from "react-redux";

// Connect your component with redux
// connect(({ first_name, second_name }) => ({ first_name, second_name }), updateAction)(YourForm);

const ProfilePage = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm({
/* 		defaultValues: {
			first_name: '',
			second_name: '',
			display_name: first_name+' '+second_name,
			login: '',
			email: '',
			phone: '',
		} */
	});
	const { theme, themeToggler } = useChangeTheme()

	const onSubmit:SubmitHandler<FieldValues> = (data) => {
	alert(JSON.stringify(data));
	};

	// console.log(watch('first_name'));

	return (
		<BrowserRouter>
		<ThemeProvider theme={theme}>
		<GlobalStyles />
		<ErrorBoundary>
			<Page>
			<Title>Profile</Title>	{/* ToDo: need to be changed to themed H1 */}
			<Profile>
			<form onSubmit={handleSubmit(onSubmit)}>
			<Container>
				<Input id='first_name' typeStyle='profile' placeholder='First name'
					{...errors.first_name && {errorOn:true, errorMessage:'Name is incorrect'}}
					{...register('first_name',
						{minLength:3, pattern: /^[A-Za-zА-Яа-яЁё]+$/i}
					)}/>
				<Input id='second_name' typeStyle='profile' placeholder='Second name'
					{...errors.second_name && {errorOn:true, errorMessage:'Name is incorrect'}}
					{...register('second_name',
						{minLength:3, pattern: /^[A-Za-zА-Яа-яЁё]+$/i}
					)}/>
				<Input id='display_name' typeStyle='profile' placeholder='Display name'
					{...errors.display_name && {errorOn:true, errorMessage:'Name is incorrect'}}
					{...register('display_name',
						{minLength:3, pattern: /^[A-Za-zА-Яа-яЁё0-9_]+\s?[A-Za-zА-Яа-яЁё0-9_]+$/}
					)}/>
				<Input id='login' typeStyle='profile' placeholder='Login*'
					{...errors.login && {errorOn:true, errorMessage:'Login is incorrect'}}
					{...register('login',
						{minLength:3, pattern: /^[A-Za-z0-9_]+$/}
					)}/>
				<Input id='email' typeStyle='profile' placeholder='E-mail*'
					{...errors.email && {errorOn:true, errorMessage:'Wrong e-mail'}}
					{...register('email',
						{minLength:3, pattern: /^[A-Za-z._\-[0-9]+[@][A-Za-z._\-[0-9]+[.][a-z]{2,4}$/}
					)}/>
				<Input id='phone' typeStyle='profile' placeholder='Phone'
					{...errors.phone && {errorOn:true, errorMessage:'Wrong phone number'}}
					{...register('phone',
						{pattern: /^[\+]?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/}
					)}/>
				<Button type='submit'>Update</Button>
				<Link to={'#'}>Change password</Link>
			</Container>
			</form>
			<Settings>
				<Avatar/>
				<div><input type={'checkbox'} onClick={themeToggler}/><label> Dark theme</label></div> {/* ToDo: Theme check state */}
			</Settings>
			</Profile>
			</Page>
		</ErrorBoundary>
	</ThemeProvider>
	</BrowserRouter>
	);
}

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: palevioletred;
`;

const Container = styled.div`
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

const Avatar=styled.div`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background-color: gray;
`;

const Page=styled.div`
	width: 800px;
	height: 360px;
	border-radius: 10px;
	background-image: linear-gradient(${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
	margin: auto;
`;

export default ProfilePage;
