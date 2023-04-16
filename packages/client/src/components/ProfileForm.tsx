import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input, { typeStyleInput } from '../ui/input'
import Button from '../ui/button'
import Link from '../ui/link'
import styled from 'styled-components'
import profileSchema from '../utils/validation/profileSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { H3 } from '../assets/styles/texts'
import ContrastingWrapper from './ContrastingWrapper'

const defaultValues = {
  first_name: '',
  second_name: '',
  display_name: '', //first_name+' '+second_name,
  login: '',
  email: '',
  phone: '',
}

type Props = {
  onSubmitForm: (data: FieldValues) => void
}

const ProfileForm: FC<Props> = props => {
  const { onSubmitForm } = props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(profileSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    onSubmitForm(data)
  }

  return (
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
          <Link to={'#'}>Change password</Link>
        </FormFields>
      </Form>
    </ContrastingWrapper>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  padding:35px;
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
  width:100%;
  button{
    margin-bottom: 1em;
  }
`

export default ProfileForm
