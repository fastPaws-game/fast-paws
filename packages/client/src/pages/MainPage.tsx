import { useAppDispatch } from '../hooks/store'
import { logOut } from '../store/auth/AuthSlice'
import { memo } from 'react'
import styled from 'styled-components'

const MainPage = () => {
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(logOut())
  }
  
  return (
    <Root>
      Здесь будет главная страница. Сейчас здесь тестовая страница для проверки
      API.
      <button onClick={logout}>Logout</button>
    </Root>
  )
}

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.primary};
`

export default memo(MainPage)
