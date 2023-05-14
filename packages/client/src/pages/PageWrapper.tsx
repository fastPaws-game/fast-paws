import React, { FC, PropsWithChildren, Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import LoadingScreen from '../components/LoadingScreen'

const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary>
      {' '}
      <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default PageWrapper
