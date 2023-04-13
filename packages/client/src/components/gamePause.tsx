import React, { FC } from 'react'
import Modal from './modal'
import Button from '../ui/button'
import styled from 'styled-components'
import IconSettings from '../assets/icons/IconSettings'
import IconStar from '../assets/icons/IconStar'
import { useNavigate } from 'react-router-dom'
import IconForum from '../assets/icons/IconForum'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
}
const GamePause: FC<Props> = props => {
  const navigate = useNavigate()

  const handleClick = (path?: string) => () => {
    if (path) navigate(path)
    props.handleClose()
  }

  return (
    <Modal {...props}>
      <Content>
        <Button size="middle" onClick={handleClick()}>
          Continue
        </Button>
        <Footer>
          <Button icon={<IconForum />} size="small" onClick={handleClick('/forum')} />
          <Button icon={<IconSettings />} size="small" onClick={handleClick('/settings')} />
          <Button icon={<IconStar />} size="small" onClick={handleClick('/leaderboard')} />
        </Footer>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export default GamePause
