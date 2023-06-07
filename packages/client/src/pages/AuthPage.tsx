import { Authorization } from '../modules/authModule/Authorization'
import BaseLayout from '../layouts/BaseLayout'
import React from 'react'

const AuthPage = () => {
  return (
    <BaseLayout>
      <Authorization />
    </BaseLayout>
  )
}

export default AuthPage
