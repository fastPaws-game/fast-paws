import { useCallback, useEffect, useState } from 'react'
import ProfileAvatar from '../../components/ProfileAvatar'
import ProfileForm, { ProfileFormValuesType } from '../../components/ProfileForm'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { getUser, logOut, updateUser } from '../../store/auth/AuthActions'
import Button from '../../ui/button'
import styled from 'styled-components'
import { useChangeTheme } from '../../hooks/useChangeTheme'
import { authSelectors } from '../../store/auth/AuthSelectors'
import { Routes } from '../../constants/routes'
import { useNavigate } from 'react-router'
import PasswordsPopup from '../../components/PasswordsPopup'

const Profile = () => {
  const { toggleTheme } = useChangeTheme()
  const [userValues, setDefaultValues] = useState<ProfileFormValuesType | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(authSelectors.getUser)
  const hasUserData = !!user?.email

  const handleSubmit = async (data: ProfileFormValuesType) => {
    dispatch(updateUser(data))
  }

  const handleLogOut = useCallback(() => {
    dispatch(logOut())
    navigate(Routes.HOME)
  }, [dispatch])

  useEffect(() => {
    ;(async () => {
      if (!hasUserData) {
        await dispatch(getUser())
          .unwrap()
          .then(originalPromiseResult => {
            setDefaultValues({
              ...originalPromiseResult,
              display_name:
                originalPromiseResult.display_name ??
                `${originalPromiseResult.first_name} ${originalPromiseResult.second_name}`,
            })
          })
      } else {
        setDefaultValues({
          ...user,
          display_name: user.display_name ?? `${user.first_name} ${user.second_name}`,
        })
      }
    })()
  }, [])

  useEffect(() => {
    if (hasUserData)
      setDefaultValues({
        ...user,
        display_name: user.display_name ?? `${user.first_name} ${user.second_name}`,
      })
  }, [user])

  return (
    <>
      <ProfileAvatar />
      {!!hasUserData && userValues && <ProfileForm onSubmitForm={handleSubmit} defaultFormValues={userValues} />}
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
