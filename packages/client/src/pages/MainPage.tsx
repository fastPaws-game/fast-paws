import React, { useEffect } from 'react'
import MainContent from '../components/MainContent'
import Paws from '../components/Paws'
import BaseLayout from '../layouts/BaseLayout'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks/store'
import { getUser, signInUser } from '../store/auth/AuthActions'

const MainPage = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    if (code) {
      dispatch(signInUser(code))
        .unwrap()
        .then(() => {
          dispatch(getUser())
          setSearchParams()
        })
    }
  }, [searchParams, setSearchParams])

  return (
    <BaseLayout>
      <Paws />
      <MainContent />
    </BaseLayout>
  )
}
export default MainPage
