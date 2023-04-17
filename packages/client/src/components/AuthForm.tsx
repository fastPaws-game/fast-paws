import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Input, { typeStyleInput } from '../ui/input'
import Button from '../ui/button'
import Link from '../ui/link'
import { H3 } from '../assets/styles/texts'
import { FC, useEffect } from 'react'
import { media } from '../assets/styles/media'
import { SubmitHandler, useForm } from 'react-hook-form'
import authSchema from '../utils/validation/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Routes } from '../constants/routes'
import { authSelectors } from '../store/auth/AuthSelectors'
import { useAppDispatch } from '../hooks/store'
import { resetSignInError } from '../store/auth/AuthSlice'

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
  const dispatch = useAppDispatch()
  const serverError = useSelector(authSelectors.getSignInError)
  const signInStatus = useSelector(authSelectors.getSignInStatus)

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: defaultAuthFormValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(authSchema),
  })

  useEffect(() => {
    setError('root.serverError', {
      message: serverError ?? '',
    })
  }, [serverError])

  useEffect(() => {
    if (isDirty) dispatch(resetSignInError())
  }, [isDirty])

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
          errorOn={!!errors.login || (signInStatus === 'error')}
          errorMessage={errors.login?.message}
        />
        <Input
          typeStyle={typeStyleInput.form}
          placeholder="Password"
          {...register('password')}
          errorOn={!!errors.password || (signInStatus === 'error')}
          errorMessage={errors.password?.message}
        />
      </InputContainer>

      <ButtonContainer>
        {serverError && <Error>{serverError}</Error>}
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          Log in
        </Button>
        <Link to={Routes.SIGNUP}>Registration</Link>
      </ButtonContainer>
    </Form>
  )
}
const Error = styled.p`
  color: ${props => props.theme.text.error};
  margin: 0;
  position: absolute;
  top: 10px;
  left: 53px;
  text-align: left;
`
const Form = styled.form`
  width: 100%;
  max-width: 345px;
  height: 100%;
  max-height: 285px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 100%;
  max-width: 246px;
  padding-top:20px;
`

const ButtonContainer = styled.div`
  display: flex;
  width:100%;
  flex-direction: column;
  gap: 10px;
  position:relative;
  padding-top:35px;
  align-items: center;

  :last-child {
    text-align: center;
  }
`

export default AuthForm
