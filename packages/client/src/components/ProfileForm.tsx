import { SubmitHandler, useForm } from 'react-hook-form'
import Input, { typeStyleInput } from '../ui/input'
import Button from '../ui/button'
import styled from 'styled-components'
import profileSchema from '../utils/validation/profileSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useState, useCallback } from 'react'
import { H3 } from '../assets/styles/texts'
import ContrastingWrapper from './ContrastingWrapper'
import { PasswordsPopup } from './PasswordsPopup'
import { TProfile } from '../models/ProfileModel'

type Props = {
  onSubmitForm: (data: TProfile) => void
  defaultFormValues: TProfile
}

const ProfileForm: FC<Props> = props => {
  const { onSubmitForm, defaultFormValues } = props
  const [modal, setModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: defaultFormValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(profileSchema),
  })

  const handleClose = useCallback(() => {
    setModal(false)
  }, [setModal])

  const handleClick = () => {
    setModal(true)
  }

  const onSubmit: SubmitHandler<TProfile> = data => {
    onSubmitForm(data)
  }

  return (
    <>
      <ContrastingWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title accent>Profile</Title>
          <FormFields>
            <Input
              typeStyle={typeStyleInput.profile}
              placeholder="First name"
              errorOn={!!errors.first_name}
              errorMessage={errors.first_name?.message}
              {...register('first_name')}
            />
            <Input
              typeStyle={typeStyleInput.profile}
              placeholder="Second name"
              errorOn={!!errors.second_name}
              errorMessage={errors.second_name?.message}
              {...register('second_name')}
            />
            <Input
              typeStyle={typeStyleInput.profile}
              placeholder="Display name"
              errorOn={!!errors.display_name}
              errorMessage={errors.display_name?.message}
              {...register('display_name')}
            />
            <Input
              typeStyle={typeStyleInput.profile}
              placeholder="Login*"
              errorOn={!!errors.login}
              errorMessage={errors.login?.message}
              {...register('login')}
            />
            <Input
              typeStyle={typeStyleInput.profile}
              placeholder="E-mail*"
              errorOn={!!errors.email}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <Input
              typeStyle={typeStyleInput.profile}
              placeholder="Phone"
              errorOn={!!errors.phone}
              errorMessage={errors.phone?.message}
              {...register('phone')}
            />
            <Button type="submit" disabled={!isDirty || isSubmitting}>
              Update
            </Button>
            <Button onClick={handleClick}>Change password</Button>
          </FormFields>
        </Form>
      </ContrastingWrapper>
      <PasswordsPopup visible={modal} outSideClickEnable handleClose={handleClose} />
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 35px;
  padding-top: 15px;
  padding-bottom: 10px;
`
const Title = styled(H3)`
  color: ${({ theme }) => theme.text.textInvert};
  align-self: flex-start;
  margin-bottom: 22px;
`

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  button {
    margin-bottom: 1em;
  }
  button:last-of-type {
    background: transparent;
    box-shadow: none;
    color: ${props => props.theme.text.everWhite};
    transition: all 0.5s ease-out;
  }
  button:last-of-type:hover {
    text-decoration: underline;
  }
  button:last-of-type:active,
  button:last-of-type:hover,
  button:last-of-type:not([disabled]):hover,
  button:last-of-type:not([disabled]):focus {
    background: transparent;
    box-shadow: none;
  }
`

export default ProfileForm
