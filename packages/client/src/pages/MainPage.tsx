import BaseLayout from '../layouts/BaseLayout'
import React from 'react'
import MainContent from '../components/MainContent'
import Paws from '../components/Paws'

const MainPage = () => {
  return (
    <BaseLayout>
      <Paws/>
      <MainContent />
    </BaseLayout>
  )
}
export default MainPage
