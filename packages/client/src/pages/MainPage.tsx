import { useNavigate } from 'react-router-dom'
import authController from '../modules/authModule/controllers/authController'

const MainPage = () => {
  const navigate = useNavigate()

  const logout = () => {
    authController.logout(() => navigate('/login'))
  }

  return (
    <div>
      Здесь будет главная страница. Сейчас здесь тестовая страница для проверки
      API.
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default MainPage
