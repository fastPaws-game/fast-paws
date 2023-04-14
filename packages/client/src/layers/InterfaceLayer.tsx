import React from 'react'
import styled from 'styled-components'

// Функция должна принимать колбэк смены state
export default function InterfaceLayer() {
  // const image = React.createRef<HTMLImageElement>()
	const state={
		score: 0,
		tip: 'Hold space to jump',
	}

  return (
    <Layer>
      <Horisontal>
				<Element>Score: {state.score}</Element>
				<Horisontal>
					<Element>Sound</Element>	{/* Значок динамика с двумя состояниями вкл/откл */}
					<Element>Pause</Element>	{/* Значок паузы (две вертикальные чёрточки) */}
				</Horisontal>
			</Horisontal>
			<GameTip>{state.tip}</GameTip>
			<div></div>
      <Horisontal>
				<Element>Settings</Element>	{/* Значок шестерёнки */}
				<Element>Full screen</Element>	{/* Значок разворачивания на полный экран как на Youtube */}
			</Horisontal>
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
const Horisontal = styled.div`
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
