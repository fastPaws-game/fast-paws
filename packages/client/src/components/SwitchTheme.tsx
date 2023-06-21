import { useState, FC } from 'react'
import styled from 'styled-components'
import { useChangeTheme } from '../hooks/useChangeTheme'
import IconTheme from '../assets/icons/IconTheme.svg'

interface Props {
  darkblue?: boolean
}

const SwitchTheme: FC<Props> = ({ darkblue }) => {
  const { toggleTheme } = useChangeTheme()
  const [isOn, setIsOn] = useState<boolean>(false)

  const handleClick = () => {
    setIsOn(!isOn)
    toggleTheme()
  }
  return (
    <SwitchBlock>
      <Icon icon={IconTheme} />
      <SwitchContainer onClick={handleClick} darkblue={darkblue}>
        <SwitchToggle isOn={isOn} />
      </SwitchContainer>
    </SwitchBlock>
  )
}

export default SwitchTheme

const SwitchBlock = styled.div`
  margin: 0 0 0 auto;
  display: flex;
  gap: 10px;
`

const SwitchContainer = styled.div<{ darkblue?: boolean }>`
  display: inline-block;
  width: 48px;
  height: 20px;
  background-color: ${props => (props.darkblue ? props.theme.colors.tertiary : props.theme.colors.accent)};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`

const SwitchToggle = styled.div<{ isOn: boolean }>`
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transform: translateX(${props => (props.isOn ? '27px' : '1')});
  transition: transform 0.2s ease-in-out;
`

const Icon = styled.div<{ icon: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.theme.text.textInvert};
  mask-size: cover;
  mask-image: url(${props => props.icon});
`
