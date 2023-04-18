import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import UserApi from '../api/UserApi'
import { H3 } from '../assets/styles/texts'
import { mapPasswords } from '../models/PasswordsModel'
import { TPasswordsFormValues } from '../models/PasswordsModel'
import Button from '../ui/button'
import Input, { typeStyleInput } from '../ui/input'
import { passwordsSchema } from '../utils/validation/registrationSchema'
import Popup from './Popup'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
}
const DEFAULT_ERROR = 'Произошла ошибка!'
const SUCCESS_MESSAGE = 'Пароль успешно изменен!'

const defaultValuesForm = {
  oldPassword: '',
  password: '',
  repeated_password: '',
}

const PasswordsPopup: FC<Props> = props => {
  const { handleClose } = props
  const [successMessage, setSuccessMessage] = useState<string>('')

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
    setSuccessMessage('')
    handleClose()
  }
  const onSubmit: SubmitHandler<TPasswordsFormValues> = async (data: TPasswordsFormValues) => {
    const preparedData = mapPasswords(data)
    try {
      const response = await UserApi.updatePassword(preparedData)
      if (response.status === 200) {
        reset()
        setSuccessMessage(SUCCESS_MESSAGE)
      }
      if (response.status !== 200) {
        const error = await response.json()
        setError('root.serverError', {
          message: error.reason,
        })
      }
    } catch (e) {
      setError('root.serverError', {
        message: DEFAULT_ERROR,
      })
    }
  }

  return (
    <Popup {...props}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <H3>Passwords</H3>
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
export { PasswordsPopup }
