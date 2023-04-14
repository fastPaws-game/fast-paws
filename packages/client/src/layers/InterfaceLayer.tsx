import React, { FC } from 'react'
import styled from 'styled-components'
import Button from '../ui/button'
import IconSettings from '../assets/icons/IconSettings'

type Props = {
	level: number
  score: number
  tooltip: string
}
const InterfaceLayer: FC<Props> = props => {
  const handleClick = (action?: string) => () => {
    console.log('Click button:', action)
  }

  return (
    <Layer>
      <HorisontalBlock>
				<div>
					<Element>Level: {props.level < 4 ? props.level + 1 : 'MAX'}</Element>
					<Element>Score: {props.score}</Element>
				</div>
				<HorisontalBlock>
					<Element>Sound</Element>	{/* Значок динамика с двумя состояниями вкл/откл */}
					<Element>Pause</Element>	{/* Значок паузы (две вертикальные чёрточки) */}
				</HorisontalBlock>
			</HorisontalBlock>
			<GameTip>{props.tooltip}</GameTip>
			<div></div>
      <HorisontalBlock>
				<Button icon={<IconSettings />} size="small" onClick={handleClick('settings')} /> {/* Сделать новые кнопки, значки должны быть svg а не jsx */}
				<Element>Full screen</Element>	{/* Значок разворачивания на полный экран как на Youtube */}
			</HorisontalBlock>
    </Layer>
  )
}

const Layer = styled.div`
  z-index: 3;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: ${props => props.theme.text.everWhite};
	font-weight: 600;
	text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`
const HorisontalBlock = styled.div`
	display: flex;
	justify-content: space-between;
`
const  Element = styled.div`
	margin: 10px;
`
const GameTip = styled.div`
	margin: 10px;
	align-self: center;
`
export default InterfaceLayer
