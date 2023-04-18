import AuthForm from '../../components/AuthForm'
import { useAppDispatch } from '../../hooks/store'
import { TSignIn } from '../../models/SignInModel'
import { signInUser } from '../../store/auth/AuthActions'

const Authorization = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: TSignIn) => {
    dispatch(signInUser(data))
  }

  return <AuthForm onSubmitFrom={handleSubmit} />
}

export { Authorization }
