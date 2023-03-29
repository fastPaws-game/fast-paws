import AuthForm from '../../components/AuthForm'
import AuthController from './authController'

const Authorization = () => {
  return (
    <AuthForm authController={AuthController.signin}/>
  )
}

export default Authorization
