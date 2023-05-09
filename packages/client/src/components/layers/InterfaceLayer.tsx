import { FC, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { GAME } from '../../constants/game'

import IconFullscreen from '../../assets/icons/fullscreen.svg'
import IconFullscreenExit from '../../assets/icons/fullscreen-exit.svg'
import IconPause from '../../assets/icons/IconPause.svg'
import IconSoundOn from '../../assets/icons/IconSoundOn.svg'
import IconSoundOff from '../../assets/icons/IconSoundOff.svg'

import IconMouse from '../../assets/icons/IconMouse.svg'
import IconButterfly from '../../assets/icons/IconButterfly.svg'
import IconBird from '../../assets/icons/IconBird.svg'
import IconFrog from '../../assets/icons/IconFrog.svg'

type Props = {
  level: number
  score: number
  combo: number
  tooltip: string
  catched: {
    butterfly: number
    grasshopper: number
    bird: number
    mouse: number
  }
  fullScreen: boolean
  switchFullScreen: () => void
  handlePause: () => void
}

type TAction = 'settings' | 'sound' | 'pause' | 'fullscreen'

const InterfaceLayer: FC<Props> = props => {
  const [sound, setSound] = useState(true)
  const navigate = useNavigate()

  const handleClick = (action?: TAction) => () => {
    switch (action) {
      case 'settings':
        navigate('/settings')
        break
      case 'sound':
        setSound(!sound)
        break
      case 'pause':
        props.handlePause()
        break
      case 'fullscreen':
        props.switchFullScreen()
        break
    }
  }

  return (
    <Layer>
      <HorisontalBlock>
        <ScoreBlock>
          <Info>Level: {props.level < 5 ? props.level + 1 : 'MAX'}</Info>
          <Info>Score: {props.score}</Info>
          <Info type='combo'>{props.combo > 1 ? `Combo: x${props.combo}` : ''}</Info>
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
        <UIButton aria-label='button' icon={sound ? IconSoundOn : IconSoundOff} onClick={handleClick('sound')} />
      </HorisontalBlock>
      <GameTip>{props.tooltip}</GameTip>
      <div></div>
      <HorisontalBlock>
        <UIButton aria-label='button' icon={IconPause} onClick={handleClick('pause')} />
        <HorisontalBlock>
          <GameVersion>{GAME.versionName}</GameVersion>
          <BrowserButton
            aria-label='button'
            icon={props.fullScreen ? IconFullscreenExit : IconFullscreen}
            onClick={handleClick('fullscreen')}
          />
        </HorisontalBlock>
      </HorisontalBlock>
    </Layer>
  )
}

const Info = styled.div<{ type?: string }>`
  color: ${props => (props.type == 'combo' ? 'yellow' : props.theme.colors.tertiary)};
  font-weight: ${props => (props.type == 'combo' ? 400 : 600)};
  text-shadow: ${props =>
    props.type == 'combo' ? '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' : 'none'};
`

const UIButton = styled.div<{ icon: string }>`
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: ${props => props.theme.colors.tertiary};
  mask-size: cover;
  mask-image: url(${props => props.icon});

  &:hover {
    background-color: ${props => props.theme.colors.accentHover};
    transition: background-color 0.3s ease-in-out;
  }
`
const IconAnimal = styled.div<{ icon: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.theme.colors.tertiary};
  mask-size: cover;
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
  color: ${props => props.theme.colors.tertiary};
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
const GameVersion = styled.div`
  align-self: flex-end;
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
