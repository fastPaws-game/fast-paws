import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'
import Input, { typeStyleInput } from '../ui/input'
import Button from '../ui/button'
import Link from '../ui/link'
import styled from 'styled-components'
import profileSchema from '../utils/validation/profileSchema'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  first_name: '',
  second_name: '',
  display_name: '', //first_name+' '+second_name,
  login: '',
  email: '',
  phone: '',
}

const ProfileForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(profileSchema),
  })
  //Profile change
  const onSubmit: SubmitHandler<FieldValues> = data => {
    alert(JSON.stringify(data))
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
    </Wrapper>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 1em;
  align-items: center;
`

const Wrapper = styled.div`
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.secondary};
  padding: 25px;
  margin-top: 10px;
  & h3 {
    text-align: center;
  }
`

export default ProfileForm
