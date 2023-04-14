import React, { FC } from 'react'
import styled from 'styled-components'
import Button from '../ui/button'
import IconSettings from '../assets/icons/IconSettings'

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
}
const InterfaceLayer: FC<Props> = props => {
  const handleClick = (action?: string) => () => {
    console.log('Click button:', action)
  }

	// Сделать новые кнопки, значки должны быть svg а не jsx
  return (
    <Layer>
      <HorisontalBlock>
				<div>
					<Element>Level: {props.level < 5 ? props.level + 1 : 'MAX'}</Element>
					<Element>Score: {props.score}</Element>
				</div>
				<Element>B: {props.catched.butterfly} G: {props.catched.grasshopper} B: {props.catched.bird} M: {props.catched.mouse}</Element>
				<HorisontalBlock>
					<Button icon={<Icon>Snd</Icon>} size="small" onClick={handleClick('sound')} />	{/* Значок динамика с двумя состояниями вкл/откл */}
					<Button icon={<Icon>| |</Icon>} size="small" onClick={handleClick('pause')} />	{/* Значок паузы (две жирные вертикальные чёрточки) */}
				</HorisontalBlock>
			</HorisontalBlock>
			<GameTip>{props.tooltip}</GameTip>
			<div></div>
      <HorisontalBlock>
				<Button icon={<IconSettings />} size="small" onClick={handleClick('settings')} />
				<Button icon={<Icon>[ ]</Icon>} size="small" onClick={handleClick('full screen')} />	{/* Значок разворачивания на полный экран как на Youtube */}
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
const Icon = styled.div`
	color: ${props => props.theme.text.everWhite};
	font-weight: 600;
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
