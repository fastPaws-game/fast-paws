import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { H1 } from '../assets/styles/texts'
import Button from '../ui/button'
import IconBack from '../assets/icons/IconBack'
import { useLocation, useNavigate } from 'react-router'
import { routes } from '../constants/routes'
import Link from '../ui/link'

type Props = {
  title?: string
  children: ReactNode | undefined
}

const LayoutWithHeader: FC<Props> = props => {
  const { title, children } = props

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <Layout>
      <Container>
        <Header>
          <Button icon={IconBack} onClick={handleClick} light></Button>
          <H1>{title ?? ''}</H1>
        </Header>
        {children}
      </Container>
    </Layout>
  )
}

const Container = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 10;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 45px;
  width: 100%;
  padding: 30px 30px 0;
`

const Layout = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  overflow: scroll;
`

export default LayoutWithHeader
