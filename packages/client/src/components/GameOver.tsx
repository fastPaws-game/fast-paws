import React, { FC } from 'react'
import Modal from './modal'
import Button from '../ui/button'
import { H1 } from '../assets/styles/texts'
import { P1 } from '../assets/styles/texts'
import styled from 'styled-components'
import IconSettings from '../assets/icons/IconSettings'
import IconStar from '../assets/icons/IconStar'
import { useNavigate } from 'react-router'

type Props = {
  visible: boolean
  handleClose: () => void
}

const GameOver: FC<Props> = props => {
  const navigate = useNavigate()

  const handleClick = (path?: string) => () => {
    if (path) navigate(path)
    props.handleClose()
  }

  return (
    <Modal {...props}>
      <Content>
        <Header>
          <H1Modify base>Game Over</H1Modify>
          <TextContainer>
            <P1 base>Your score</P1>
            <P1 base>500</P1>
          </TextContainer>
          <TextContainer>
            <P1 base>You best score</P1>
            <P1 base>500</P1>
          </TextContainer>
        </Header>
        <Footer>
          <Button icon={<h1>&lt;</h1>} size={'big'} onClick={handleClick()} />
          <Button
            icon={<IconSettings />}
            size={'big'}
            onClick={handleClick('/settings')}
          />
          <Button
            icon={<IconStar />}
            size={'big'}
            onClick={handleClick('/leaderboard')}
          />
        </Footer>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  width: 100%;
  max-width: 395px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  gap: 25px;
  background-color: ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borders.secondary};
  box-shadow: ${props => props.theme.shadows.secondary};
`
const H1Modify = styled(H1)`
  width: 55%;
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.colors.white};
  text-align: center;
`
const TextContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
`
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default GameOver
