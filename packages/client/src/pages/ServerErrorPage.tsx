import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import ErrorWithImage from '../components/ErrorWithImage'

const ServerErrorPage = () => {
  return (
    <BaseLayout>
      <ErrorWithImage type='serverError' />
    </BaseLayout>
  )
}

export default ServerErrorPage
