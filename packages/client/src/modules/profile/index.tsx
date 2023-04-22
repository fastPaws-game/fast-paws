import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import ProfileForm from '../../components/ProfileForm'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import {  logOut, updateAvatar, updateUser } from '../../store/auth/AuthActions'
import Button from '../../ui/button'
import styled from 'styled-components'
import { useChangeTheme } from '../../hooks/useChangeTheme'
import { authSelectors } from '../../store/auth/AuthSelectors'
import { Routes } from '../../constants/routes'
import { useNavigate } from 'react-router'
import { TProfile } from '../../models/ProfileModel'

const Profile = () => {
  const { toggleTheme } = useChangeTheme()
  const [userValues, setDefaultValues] = useState<TProfile | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(authSelectors.getUser)

  const hasUserData = !!user?.email
  const themeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleToggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    toggleTheme()
    if (e.target instanceof HTMLElement) {
      e.target.blur();
    }
  }

  const handleSubmitUser = async (data: TProfile) => {
    dispatch(updateUser(data))
  }

  //TODO типизация
  const handleSubmitAvatar = async (data: any) => {
    const newAvatar = new FormData()
    newAvatar.append('avatar', data[0])
    dispatch(updateAvatar(newAvatar))
  }

  const handleLogOut = useCallback(() => {
    dispatch(logOut())
    navigate(Routes.SIGNIN)
  }, [dispatch])

  useEffect(() => {
    if (hasUserData)
    setDefaultValues({
      ...user,
      display_name: user.display_name ?? `${user.first_name} ${user.second_name}`,
    })
  }, [])

  useEffect(() => {
    if (hasUserData)
      setDefaultValues({
        ...user,
        display_name: user.display_name ?? `${user.first_name} ${user.second_name}`,
      })
  }, [user])

  if (!!hasUserData && userValues) {
    return (
      <>
        <ProfileForm onSubmitUser={handleSubmitUser} onSubmitAvatar ={handleSubmitAvatar} defaultFormValues={userValues} />
        <Footer>
          <Button onClick={handleToggleTheme}>Toggle theme</Button>
          <Button onClick={handleLogOut} ref={themeBtnRef}>Log out</Button>
        </Footer>
      </>
    )
  }
  else {
    return <></>
  }

}

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`
export default Profile
