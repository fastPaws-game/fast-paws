import React, { FC, PropsWithChildren } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

export default PageWrapper
