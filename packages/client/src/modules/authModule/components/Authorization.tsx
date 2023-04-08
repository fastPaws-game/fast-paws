import AuthForm, { AuthFormValues } from '../../../components/AuthForm'
import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import { signIn } from '../store'
import { RootState } from '../../../store'
import { useEffect } from 'react'
import { getUser } from '../../../store/user'

const Authorization = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state: RootState) => state.auth)

  const handleSubmit = (data: AuthFormValues) => {
    dispatch(signIn(data))
  }

  useEffect(() => {
    if (status === 'success') {
      dispatch(getUser())
    }
  }, [status])

  return <AuthForm onSubmit={handleSubmit} />
}

export default Authorization
