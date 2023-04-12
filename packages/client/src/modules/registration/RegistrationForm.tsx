import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input, { typeStyleInput } from '../../ui/input'
import Button from '../../ui/button'
import Link from '../../ui/link'
import styled from 'styled-components'
import { Routes } from '../../constants/routes'
import { media } from '../../assets/styles/media'
import { FC, useEffect } from 'react'
import { SignUpFormValues } from '../../modules/registration/registrationApi'
import { registrationSchema } from '../../utils/validation/registrationSchema'

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
  const {
    register,
    reset,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: defaultValuesSignUpForm,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(registrationSchema),
  })

  useEffect(() => {
    setFocus('login')
  }, [])

  const onSubmit: SubmitHandler<SignUpFormValues> = (
    data: SignUpFormValues
  ) => {
    console.log(JSON.stringify(data))
    handleRegistration(data)
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <Input
          placeholder="Login"
          typeStyle={typeStyleInput.form}
          {...register('login')}
          errorOn={!!errors.login}
          errorMessage={errors.login?.message}
        />
        <Input
          placeholder="Email"
          typeStyle={typeStyleInput.form}
          {...register('email')}
          errorOn={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          placeholder="Name"
          typeStyle={typeStyleInput.form}
          {...register('first_name')}
          errorOn={!!errors.first_name}
          errorMessage={errors.first_name?.message}
        />
        <Input
          placeholder="Surname"
          typeStyle={typeStyleInput.form}
          {...register('second_name')}
          errorOn={!!errors.second_name}
          errorMessage={errors.second_name?.message}
        />
      </Column>
      <Column>
        <Input
          placeholder="Phone"
          typeStyle={typeStyleInput.form}
          {...register('phone')}
          errorOn={!!errors.phone}
          errorMessage={errors.phone?.message}
        />
        <Input
          placeholder="Password"
          typeStyle={typeStyleInput.form}
          type="password"
          {...register('password')}
          errorOn={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <Input
          placeholder="Repeat password"
          typeStyle={typeStyleInput.form}
          type="password"
          {...register('repeated_password')}
          errorOn={!!errors.repeated_password}
          errorMessage={errors.repeated_password?.message}
        />
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          Sign up
        </Button>
        <Link to={Routes.HOME}>Log in</Link>
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
