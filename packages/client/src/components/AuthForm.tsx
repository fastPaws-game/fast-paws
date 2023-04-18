import styled from 'styled-components'
import Input, { typeStyleInput } from '../ui/input'
import Button from '..//ui/button'
import Link from '..//ui/link'
import { H3 } from '../assets/styles/texts'
import { FC } from 'react'
import { media } from '../assets/styles/media'
import { SubmitHandler, useForm } from 'react-hook-form'
import authSchema from '../utils/validation/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Routes } from '../constants/routes'
import { useNavigate } from 'react-router'

export type AuthFormValues = {
  login: string
  password: string
}

const defaultAuthFormValues = {
  login: '',
  password: '',
}

type Props = {
  onSubmitFrom: (data: AuthFormValues) => void
}

const AuthForm: FC<Props> = props => {
  const { onSubmitFrom } = props
	const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: defaultAuthFormValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(authSchema),
  })

  const onSubmit: SubmitHandler<AuthFormValues> = data => {
    onSubmitFrom(data)
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <H3 accent>Login</H3>
      <InputContainer>
        <Input
          typeStyle={typeStyleInput.form}
          placeholder="Login"
          {...register('login')}
          errorOn={!!errors.login}
          errorMessage={errors.login?.message}
        />
        <Input
          typeStyle={typeStyleInput.form}
          placeholder="Password"
          type='password'
          {...register('password')}
          errorOn={!!errors.password}
          errorMessage={errors.password?.message}
        />
      </InputContainer>
      <ButtonContainer>
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          Log in
        </Button>
        <Link to={Routes.SIGNUP}>Registration</Link>
      </ButtonContainer>
    </Form>
  )
}

const Wrapper = styled.div`
	width: 100%;
  max-width: 400px;
  gap: 20px;
  display: flex;
  flex-direction: column;
	align-items: center;
`

const Form = styled.form`
  width: 100%;
  max-width: 380px;
  height: 100%;
  max-height: 285px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borders.primary};
  transition: 0.3s;
  padding: 15px 0;

  ${media.small} {
    width: 245px;
    height: 270px;
  }
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  & div {
    width: 100%;
    text-align: center;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  :last-child {
    text-align: center;
  }
`

export default AuthForm
