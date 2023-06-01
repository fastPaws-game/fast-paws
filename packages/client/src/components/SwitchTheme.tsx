import { useState, FC } from 'react'
import styled from 'styled-components'
import { useChangeTheme } from '../hooks/useChangeTheme'

interface Props {
  darkblue?: boolean
}

const SwitchContainer = styled.div<{ darkblue?: boolean }>`
  display: inline-block;
  margin: 80px 20px 0 auto;
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

const SwitchTheme: FC<Props> = ({ darkblue }) => {
  const { toggleTheme } = useChangeTheme()
  const [isOn, setIsOn] = useState<boolean>(false)

  const handleClick = () => {
    setIsOn(!isOn)
    toggleTheme()
  }
  return (
    <SwitchContainer onClick={handleClick} darkblue={darkblue}>
      <SwitchToggle isOn={isOn} />
    </SwitchContainer>
  )
}

export default SwitchTheme
7
