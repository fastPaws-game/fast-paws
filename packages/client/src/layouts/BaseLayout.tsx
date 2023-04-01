import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

const BaseLayout: FC<PropsWithChildren> = props => {
  const { children } = props
  return <Root>{children}</Root>
}

const Root = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export default BaseLayout
