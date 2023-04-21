import { useCallback, useEffect, useState } from 'react'
import ProfileAvatar from '../../components/ProfileAvatar'
import ProfileForm from '../../components/ProfileForm'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { getUser, logOut, updateUser } from '../../store/auth/AuthActions'
import Button from '../../ui/button'
import styled from 'styled-components'
import { useChangeTheme } from '../../hooks/useChangeTheme'
import { authSelectors } from '../../store/auth/AuthSelectors'
import { Routes } from '../../constants/routes'
import { useNavigate } from 'react-router'
import { TProfile } from '../../models/ProfileModel'
import { TUser } from '../../models/UserModel'
import ContrastingWrapper from '../../components/ContrastingWrapper'

const defaultFormValues: TProfile = {
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
}

function getFormValues(user: TUser | null): TProfile {
  return user
    ? {
        first_name: user.first_name,
        second_name: user.second_name,
        display_name: user.display_name ?? `${user.first_name} ${user.second_name}`,
        login: user.login,
        email: user.email,
        phone: user.phone,
      }
    : defaultFormValues
}

const Profile = () => {
  const { toggleTheme } = useChangeTheme()
  const [formValues, setFormValues] = useState<TProfile>(defaultFormValues)
  const [avatarUrl, setAvatar] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(authSelectors.getUser)
  const hasUserData = (): boolean => !(!user || !user.email || user.email == '')

  const handleSubmit = async (data: TProfile) => {
    dispatch(updateUser(data))
  }

  const handleLogOut = useCallback(() => {
    dispatch(logOut())
    navigate(Routes.HOME)
  }, [dispatch])

  useEffect(() => {
    ;(async () => {
      if (!hasUserData()) {
        await dispatch(getUser())
      }
    })()
  }, [])

  useEffect(() => {
    if (hasUserData()) {
      setFormValues(getFormValues(user))
      if (user?.avatar && user.avatar != '') setAvatar(user.avatar)
    }
  }, [user])

  return (
    <>
      <ProfileAvatar avatarUrl={avatarUrl} />
{/*
 			Жутко кривая заплатка. Я придал ей вид, но всё равно не хорошо.
			Думаю проблема в том что поле того как useForm получил пустые поля по дефолту а потом они обновились то
			компонент ProfileForm обновляется но useForm оставляет старые данные.
			Нужна помощь!
*/}
      {formValues && formValues.email !== '' ? (
        <ProfileForm onSubmitForm={handleSubmit} formValues={formValues} />
      ) : (
        <ContrastingWrapper>Receiving profile data...</ContrastingWrapper>
      )}
      <Footer>
        <Button onClick={toggleTheme}>Toggle theme</Button>
        <Button onClick={handleLogOut}>Log out</Button>
      </Footer>
    </>
  )
}

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`
export default Profile
