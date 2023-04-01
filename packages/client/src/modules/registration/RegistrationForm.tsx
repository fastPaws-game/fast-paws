import { SubmitHandler, useForm } from 'react-hook-form'
import Input, { typeStyleInput } from '../../ui/input'
import Button from '../../ui/button'
import Link from '../../ui/link'
import styled from 'styled-components/macro'
import { routes } from '../../constants/routes'
import { media } from '../../assets/styles/media'
import { FC } from 'react'
import { SignUpFormValues } from './registrationApi'

//TODO добавить валидацию

const defaultValuesSignUpForm = {
  login: '',
  email: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  repeated_password: '',
}

type Props = {
  handleRegistration: (values: SignUpFormValues) => void
}

const RegistrationForm: FC<Props> = props => {
  const { handleRegistration } = props
  const { register, reset, handleSubmit } = useForm({
    defaultValues: defaultValuesSignUpForm,
  })

  const onSubmit: SubmitHandler<SignUpFormValues> = (
    data: SignUpFormValues
  ) => {
    alert(JSON.stringify(data))
    handleRegistration(data)
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <Input
          placeholder="Login"
          typeStyle={typeStyleInput.form}
          id="login"
          {...register('login')}
        />
        <Input
          placeholder="Email"
          typeStyle={typeStyleInput.form}
          id="email"
          {...register('email')}
        />
        <Input
          placeholder="Name"
          typeStyle={typeStyleInput.form}
          id="name"
          {...register('first_name')}
        />
        <Input
          placeholder="Surname"
          typeStyle={typeStyleInput.form}
          {...register('second_name')}
          id="surname"
        />
      </Column>
      <Column>
        <Input
          placeholder="Phone"
          typeStyle={typeStyleInput.form}
          id="phone"
          {...register('phone')}
        />
        <Input
          placeholder="Password"
          typeStyle={typeStyleInput.form}
          id="password"
          {...register('password')}
        />
        <Input
          placeholder="Repeat password"
          typeStyle={typeStyleInput.form}
          id="repeated_password"
          {...register('repeated_password')}
        />
        <Button type="submit">Sign up</Button>
        <Link to={routes.signin}>Log in</Link>
      </Column>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 660px) {
    flex-direction: column;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 30px;
    min-width: 100%;
  }
  ${media.small} {
    flex-direction: column;
    align-items: center;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 290px;

  & div {
    width: 100%;
    text-align: center;
  }
  & button {
    margin-top: 15px;
    margin-bottom: 4px;
  }
`
export default RegistrationForm