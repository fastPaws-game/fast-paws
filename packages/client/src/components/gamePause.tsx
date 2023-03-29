import React, { FC } from 'react'
import Modal from './modal'
import Button from '../ui/button'
import styled from 'styled-components'
import IconSettings from '../assets/icons/IconSettings'
import IconStar from '../assets/icons/IconStar'
import { useNavigate } from 'react-router'

type Props = {
  visible: boolean
  handleClose: () => void
}
const GamePause: FC<Props> = (props) => {
  const navigate = useNavigate()

  const handleClick = (path?: string) => () => {
    if (path) navigate(path)
    props.handleClose()
  }

  return (
    <Modal {...props}>
      <Content>
        <Button size={'big'} onClick={handleClick()}>Continue</Button>
        <Footer>
          <Button icon={IconSettings} size={'big'} onClick={handleClick('/settings')} />
          <Button icon={IconStar} size={'big'} onClick={handleClick('/leaderboard')} />
        </Footer>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export default GamePause
