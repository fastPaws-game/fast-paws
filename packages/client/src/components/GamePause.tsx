import React, { FC } from 'react'
import Modal from './modal'
import Button from '../ui/button'
import styled from 'styled-components'
import IconSettings from '../assets/icons/IconSettings'
import IconStar from '../assets/icons/IconStar'
import { useNavigate } from 'react-router-dom'
import IconForum from '../assets/icons/IconForum'
import { Routes } from '../constants/routes'

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
        <Button size="middle" onClick={handleClick()} darkblue>
          Continue
        </Button>
        <Button size="middle" onClick={handleClick(Routes.HOME)} darkblue>
          Exit
        </Button>
        <Footer>
          <Button icon={<IconForum />} size="small" onClick={handleClick(Routes.FORUM)} darkblue />
          <Button icon={<IconSettings />} size="small" onClick={handleClick(Routes.SETTINGS)} darkblue />
          <Button icon={<IconStar />} size="small" onClick={handleClick(Routes.LEADERBOARD)} darkblue />
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
