import AuthForm, { AuthFormValues } from '../../../components/AuthForm'
import { useAppDispatch } from '../../../hooks/store'
import { signInUser } from '../../../store/auth/AuthSlice'

const Authorization = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: AuthFormValues) => {
    dispatch(signInUser(data))
  }

  return <AuthForm onSubmitFrom={handleSubmit} />
}

export default Authorization
