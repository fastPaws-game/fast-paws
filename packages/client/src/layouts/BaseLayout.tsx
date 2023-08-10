import React, { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'
import PageWrapper from '../pages/PageWrapper'

const BaseLayout: FC<PropsWithChildren> = props => {
  const { children } = props
  return (
    <Root>
      <PageWrapper>{children}</PageWrapper>
    </Root>
  )
}

const Root = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`

export default BaseLayout
