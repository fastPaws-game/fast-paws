import styled from 'styled-components'
import Input, { typeStyleInput } from '../ui/input'
import Button from '..//ui/button'
import Link from '..//ui/link'
import { H3 } from '../assets/styles/texts'
import { FC } from 'react'
import { media } from '../assets/styles/media'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export type AuthFormValues = {
  login: string
  password: string
}

const defaultAuthFormValues = {
  login: '',
  password: '',
}

type Props = {
  authController: (data: AuthFormValues, callback: VoidFunction) => void
}

const VALIDATIONS = {
  LOGIN: {
    required: true,
    pattern: {
      value: /^[a-zA-Z][a-zA-Z0-9-_]{3,20}$/,
      message: 'Login incorrect',
    },
  },
  PASSWORD: {
    required: true,
    pattern: {
      value: /^.*(?=.{8,40})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      message: 'Password incorrect',
    },
  },
}

const AuthForm: FC<Props> = props => {
  useEffect(() => {
    window.localStorage.setItem('isAuth', 'false') 
  }, [])
  
  const navigate = useNavigate()
  const { authController } = props
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    mode: 'onChange',
    defaultValues: defaultAuthFormValues,
  })
  const onSubmit: SubmitHandler<AuthFormValues> = data => {
    authController(data, () => navigate('/main'))
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <H3 accent>Login</H3>
      <InputContainer>
        <Input
          typeStyle={typeStyleInput.form}
          placeholder="Login"
          {...register('login', VALIDATIONS.LOGIN)}
          {...(errors.login && {
            errorOn: true,
            errorMessage: errors.login.message,
          })}
        />
        <Input
          typeStyle={typeStyleInput.form}
          placeholder="Password"
          {...register('password', VALIDATIONS.PASSWORD)}
          {...(errors.password && {
            errorOn: true,
            errorMessage: errors.password.message,
          })}
        />
      </InputContainer>
      <ButtonContainer>
        <Button type="submit">Log in</Button>
        <Link to="/registration">Registration</Link>
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
