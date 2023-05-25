import { yupResolver } from '@hookform/resolvers/yup'
import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { H3 } from '../assets/styles/texts'
import { mapPasswords, TPasswordsFormValues } from '../models/PasswordsModel'
import Button from '../ui/button'
import Input, { typeStyleInput } from '../ui/input'
import { passwordsSchema } from '../utils/validation/registrationSchema'
import Popup from './Popup'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { updatePassword } from '../store/auth/AuthActions'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
  successMessageProp?: string
  title?: string
}

const SUCCESS_MESSAGE = 'Пароль успешно изменен!'

const defaultValuesForm = {
  oldPassword: '',
  password: '',
  repeated_password: '',
}

const ProfileFormPopup: FC<Props> = props => {
  const { handleClose, successMessageProp, title = 'Passwords' } = props
  const [successMessage, setSuccessMessage] = useState<string>(successMessageProp || '')
  const dispatch = useAppDispatch()
  const passwordStatus = useAppSelector(state => state.auth.passwordStatus)
  const passwordError = useAppSelector(state => state.auth.passwordError)

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValuesForm,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(passwordsSchema),
  })

  const onCloseClick = () => {
    setSuccessMessage(successMessageProp || '')
    handleClose()
  }

  useEffect(() => {
    if (passwordStatus === 'success') {
      reset()
      setSuccessMessage(SUCCESS_MESSAGE)
    }
    if (passwordStatus === 'error' && passwordError) {
      setError('root.serverError', {
        message: passwordError,
      })
    }
  }, [passwordStatus, passwordError, reset, setError])
  const onSubmit: SubmitHandler<TPasswordsFormValues> = async (data: TPasswordsFormValues) => {
    const preparedData = mapPasswords(data)
    dispatch(updatePassword(preparedData))
  }

  return (
    <Popup {...props}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <H3>{title}</H3>
        {!successMessage && (
          <>
            <Input
              placeholder="Old password"
              typeStyle={typeStyleInput.form}
              type="password"
              {...register('oldPassword')}
              errorOn={!!errors.oldPassword}
              errorMessage={errors.oldPassword?.message}
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
          </>
        )}
        {errors?.root?.serverError && <Error>{errors?.root?.serverError.message}</Error>}
        {!!successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {!successMessage ? (
          <Button size="small" type="submit">
            Change
          </Button>
        ) : (
          <Button size="small" type="button" onClick={onCloseClick}>
            Close
          </Button>
        )}
      </Form>
    </Popup>
  )
}
const Error = styled.p`
  color: ${props => props.theme.text.error};
  margin: 0;
  position: absolute;
  bottom: 37px;
  left: 25px;
  text-align: left;
`
const SuccessMessage = styled.p`
  text-align: left;
  color: ${({ theme }) => theme.colors.success};
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;

  button {
    margin-top: 15px;
  }

  h3 {
    margin-bottom: 15px;
  }
`
export { ProfileFormPopup }
