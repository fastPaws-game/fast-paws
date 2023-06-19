import React, { useEffect } from 'react'
import MainContent from '../components/MainContent'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks/store'
import { getUser, signInUser } from '../store/auth/AuthActions'
import ParallaxBg from '../components/ParallaxBg'

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
      <MainContent />
    </>
  )
}

export default MainPage
