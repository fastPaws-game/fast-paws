import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

const ForumLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <Layout>{children}</Layout>
  )
}

const Layout = styled.div`
    background: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100vh;
    overflow: scroll;
`

export default ForumLayout
