import React, { FC, PropsWithChildren } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}
// <Suspense fallback={<LoadingPage />}>{children}</Suspense>

export default PageWrapper
