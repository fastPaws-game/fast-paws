import React, { useCallback } from 'react'
import ProfileAvatar from '../../../components/ProfileAvatar'
import ProfileForm from '../../../components/ProfileForm'
import { useAppDispatch } from '../../../hooks/store'
import { logOut } from '../../../store/auth/AuthSlice'
import Button from '../../../ui/button'
import styled from 'styled-components'
import { FieldValues } from 'react-hook-form'
import { useChangeTheme } from '../../../hooks/useChangeTheme'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { toggleTheme } = useChangeTheme()
  const handleSubmit = (data: FieldValues) => {
    console.log(data)
  }

  const handleLogOut = useCallback(() => {
    dispatch(logOut())
  }, [dispatch])

  return (
    <>
      <ProfileAvatar />
      <ProfileForm onSubmitForm={handleSubmit} />
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
