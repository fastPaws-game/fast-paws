import ErrorBoundary from '../components/ErrorBoundary'
import LoadingPage from '../components/LoadingScreen'
import React, { FC, PropsWithChildren, Suspense } from 'react'

const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default PageWrapper
