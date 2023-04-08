import styled from 'styled-components'
import Input, { typeStyleInput } from '../ui/input'
import Button from '..//ui/button'
import Link from '..//ui/link'
import { H3 } from '../assets/styles/texts'
import { FC, useEffect } from 'react'
import { media } from '../assets/styles/media'
import { SubmitHandler, useForm } from 'react-hook-form'
import authSchema from '../utils/validation/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { routes } from '../constants/routes'

export type AuthFormValues = {
  login: string
  password: string
}

const defaultAuthFormValues = {
  login: '',
  password: ''
}

type Props = {
  onSubmit: (data: AuthFormValues) => void
}

const AuthForm: FC<Props> = props => {
  useEffect(() => {
    window.localStorage.setItem('isAuth', 'false')
  }, [])

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    defaultValues: defaultAuthFormValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(authSchema)
  })

  const onSubmit: SubmitHandler<AuthFormValues> = data => {
    props.onSubmit(data)
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <H3 accent>Login</H3>
      <InputContainer>
        <Input
          typeStyle={typeStyleInput.form}
          placeholder='Login'
          {...register('login')}
          errorOn={!!errors.login}
          errorMessage={errors.login?.message}
        />
        <Input
          typeStyle={typeStyleInput.form}
          placeholder='Password'
          {...register('password')}
          errorOn={!!errors.password}
          errorMessage={errors.password?.message}
        />
      </InputContainer>
      <ButtonContainer>
        <Button type='submit' disabled={!isDirty || isSubmitting}>Log in</Button>
        <Link to={routes.signin}>Registration</Link>
      </ButtonContainer>
    </Form>
  )
}

const Form = styled.form`
  width: 100%;
  max-width: 345px;
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
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  :last-child {
    text-align: center;
  }
`

export default AuthForm
