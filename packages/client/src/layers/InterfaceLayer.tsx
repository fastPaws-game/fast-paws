import { FC, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import IconSettings from '../assets/icons/IconSettings.svg'
import IconFullscreen from '../assets/icons/IconFullscreen.svg'
import IconPause from '../assets/icons/IconPause.svg'
import IconSoundOn from '../assets/icons/IconSoundOn.svg'
import IconSoundOff from '../assets/icons/IconSoundOff.svg'

import IconMouse from '../assets/icons/IconMouse.svg'
import IconButterfly from '../assets/icons/IconButterfly.svg'
import IconBird from '../assets/icons/IconBird.svg'
import IconFrog from '../assets/icons/IconFrog.svg'

import Beep from '../assets/sounds/Beep'

type Props = {
  level: number
  score: number
  tooltip: string
  catched: {
    butterfly: number
    grasshopper: number
    bird: number
    mouse: number
  }
  switchFullWidth: () => void
  handlePause: () => void
}

type TAction = 'settings' | 'sound' | 'pause' | 'fullscreen' | 'fullwidth'

const InterfaceLayer: FC<Props> = props => {
  const [sound, setSound] = useState(true)
  const navigate = useNavigate()

  const handleClick = (action?: TAction) => () => {
    switch (action) {
      case 'settings':
        navigate('/settings')
        break
      case 'sound':
        Beep.play()
        setSound(!sound)
        break
      case 'pause':
        props.handlePause()
        break
      case 'fullwidth':
        props.switchFullWidth()
        break
    }
  }

  return (
    <Layer>
      <HorisontalBlock>
        <ScoreBlock>
          <div>Level: {props.level < 5 ? props.level + 1 : 'MAX'}</div>
          <div>Score: {props.score}</div>
        </ScoreBlock>
        <HorisontalBlock>
          <IconAnimal icon={IconButterfly} />
          <span> {props.catched.butterfly}</span>
          <IconAnimal icon={IconFrog} />
          <span> {props.catched.grasshopper}</span>
          <IconAnimal icon={IconBird} />
          <span> {props.catched.bird}</span>
          <IconAnimal icon={IconMouse} />
          <span> {props.catched.mouse}</span>
        </HorisontalBlock>
        <HorisontalBlock>
          <UIButton aria-label="button" icon={sound ? IconSoundOn : IconSoundOff} onClick={handleClick('sound')} />
          <BrowserButton aria-label="button" icon={IconPause} onClick={handleClick('pause')} />
        </HorisontalBlock>
      </HorisontalBlock>
      <GameTip>{props.tooltip}</GameTip>
      <div></div>
      <HorisontalBlock>
        <UIButton aria-label="button" icon={IconSettings} onClick={handleClick('settings')} />
        <BrowserButton aria-label="button" icon={IconFullscreen} onClick={handleClick('fullwidth')} />
        <DeviceButton aria-label="button" icon={IconPause} onClick={handleClick('pause')} />
      </HorisontalBlock>
    </Layer>
  )
}

const UIButton = styled.div<{ icon: string }>`
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: ${props => props.theme.colors.accent};
  mask-size: cover;
  mask-size: cover;
  mask-image: url(${props => props.icon});
  mask-image: url(${props => props.icon});
  &:hover {
    background-color: ${props => props.theme.colors.accentHover};
    transition: background-color 0.3s ease-in-out;
  }
`
const IconAnimal = styled.div<{ icon: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.theme.colors.accent};
  mask-size: cover;
  mask-size: cover;
  mask-image: url(${props => props.icon});
  mask-image: url(${props => props.icon});
`
const Layer = styled.div`
  z-index: 3;
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => props.theme.text.everWhite};
  font-size: ${props => props.theme.vars.fontSize.s};
  font-weight: 600;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`
const ScoreBlock = styled.div`
  font-size: ${props => props.theme.vars.fontSize.l};
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
  text-shadow: none;
`
const HorisontalBlock = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`
const GameTip = styled.div`
  align-self: center;
`

function browserOnly(WrappedComponent: FC) {
  return (props: any) => (isMobile ? null : <WrappedComponent {...props} />)
}
const BrowserButton = browserOnly(UIButton)

function deviceOnly(WrappedComponent: FC) {
  return (props: any) => (isMobile ? <WrappedComponent {...props} /> : null)
}
const DeviceButton = deviceOnly(UIButton)

export default InterfaceLayer
