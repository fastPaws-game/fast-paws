import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import ErrorWithImage from '../components/ErrorWithImage'

const NotFoundPage = () => {
  return (
    <BaseLayout>
      <ErrorWithImage type="notFound" />
    </BaseLayout>
  )
}

export default NotFoundPage
