import React, { useEffect } from 'react'
import MainContent from '../components/MainContent'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks/store'
import { getUser, signInUser } from '../store/auth/AuthActions'
import BaseLayout from '../layouts/BaseLayout'
import ParallaxBg from '../components/ParallaxBg'
import Paws from '../components/Paws'

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
    <>
      <ParallaxBg />
      <Paws />
      <MainContent />
    </>
  )
}

export default MainPage
