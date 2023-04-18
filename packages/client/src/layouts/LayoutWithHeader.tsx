import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { H1 } from '../assets/styles/texts'
import Button from '../ui/button'
import IconBack from '../assets/icons/IconBack'
import { useNavigate } from 'react-router'

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
    <Container>
      <Header>
        <Button icon={IconBack} onClick={handleClick} light></Button>
      </Header>
      {children}
    </Container>
  )
}

const Container = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3em;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 45px;
  width: 100%;
`

export default LayoutWithHeader
