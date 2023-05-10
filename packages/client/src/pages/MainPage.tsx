import React from 'react'
import MainContent from '../components/MainContent'
import Paws from '../components/Paws'
import BaseLayout from '../layouts/BaseLayout'

const MainPage = () => {
  return (
    <BaseLayout>
      <Paws />
      <MainContent />
    </BaseLayout>
  )
}
export default MainPage
