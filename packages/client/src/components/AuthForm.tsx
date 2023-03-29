import styled from 'styled-components'
import Input from '../ui/input'
import Button from '..//ui/button'
import Link from '..//ui/link'
import { H3 } from '../assets/styles/texts'
import React, { FC } from 'react'
import { media } from '../assets/styles/media'
import { useForm, SubmitHandler } from 'react-hook-form'

export type AuthFormValues = {
  login: string
  password: string
}

const defaultAuthFormValues = {
  login: '',
  password: '',
}

type Props = {
  authController: (data: AuthFormValues) => void
}

const VALIDATIONS = {
  LOGIN: {
    required: true,
    pattern: /^[a-zA-Z][a-zA-Z0-9-_]{3,20}$/
  },
  PASSWORD: {
    required: true,
    pattern: /^.*(?=.{8,40})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/
  }
}

const AuthForm: FC<Props> = props => {
  const { authController } = props
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AuthFormValues>({
    defaultValues: defaultAuthFormValues,
  })
  const onSubmit: SubmitHandler<AuthFormValues> = data => {
    console.log(data)
    authController(data)
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <H3 accent>Login</H3>
      <InputContainer>
        <Input
          typeStyle="form"
          placeholder="Login"
          {...register('login', VALIDATIONS.LOGIN)}
          {...errors.login && {errorOn:true, errorMessage:'Login is incorrect'}}
        />
        <Input
          typeStyle="form"
          placeholder="Password"
          {...register('password', VALIDATIONS.PASSWORD)}
          {...errors.password && {errorOn:true, errorMessage:'Password is incorrect'}}
        />
      </InputContainer>
      <ButtonContainer>
        <Button type="submit">Log in</Button>
        <Link to="/">Registration</Link>
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
