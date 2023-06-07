import React from 'react'
import Button from '../ui/button'
import IconForum from '../assets/icons/IconForum'
import IconSettings from '../assets/icons/IconSettings'
import IconStar from '../assets/icons/IconStar'
import styled from 'styled-components'
import { H1 } from '../assets/styles/texts'
import Link from '../ui/link'
import { media } from '../assets/styles/media'
import SwitchTheme from './SwitchTheme'

const MainContent = () => {
  return (
    <Root>
      <SwitchTheme />
      <MainTitle>Fast Paws</MainTitle>
      <Buttons>
        <Link to={'/game'}>
          <Button size={'big'}>Play</Button>
        </Link>
        <Footer>
          <Link to={'/forum'}>
            <Button icon={<IconForum />} size={'big'} />
          </Link>
          <Link to={'/settings'}>
            <Button icon={<IconSettings />} size={'big'} />
          </Link>
          <Link to={'/leaderboard'}>
            <Button icon={<IconStar />} size={'big'} />
          </Link>
        </Footer>
      </Buttons>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  gap: 75px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const MainTitle = styled(H1)`
  font-size: 100px;

  ${media.small} {
    font-size: 70px;
  }
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default MainContent
