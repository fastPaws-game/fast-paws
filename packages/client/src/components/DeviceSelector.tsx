import { useState, useEffect, createRef } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { CANVAS } from '../constants/game'
import Game from './Game'

const DeviceSelector = () => {
  const [fullScreen, setFullScreen] = useState(false)
	const ref = createRef<HTMLDivElement>()

	const switchFullScreen = () => {
		setFullScreen(!fullScreen)
		setDimensions()
	}

	function setDimensions() {
		let canvasWidth = CANVAS.width
		let canvasHeight = CANVAS.height
	
		if (isMobile || fullScreen) {
			canvasWidth = window.innerWidth
			const expectedHeight = Math.floor(window.innerWidth * CANVAS.aspectRatio)
			if (expectedHeight < window.innerHeight) {
				canvasHeight = Math.floor(Math.min(expectedHeight * 1.25, window.innerHeight))
			} else {
				canvasHeight = window.innerHeight
			}
		}

		const element = ref.current
		if (element) {
			element.style.width = canvasWidth+'px'
			element.style.height = canvasHeight+'px'
		}
	
		return {canvasWidth, canvasHeight}
	}

  useEffect(() => {
		setDimensions()
    const handleResize = () => {
			const dimensions = setDimensions()
			// setDimensions(dimensions)
		}
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <RootWrapper>
      <GameWrapper ref={ref}>
        <Game switchFullScreen={switchFullScreen}/>
      </GameWrapper>
    </RootWrapper>
  )
}

const GameWrapper = styled.div`
  width: ${CANVAS.width}px;
  height: ${CANVAS.height}px;
  position: relative;
  left: 0px;
  top: 0px;
  overflow: clip;
  & canvas {
    width: 100%;
    height: 100%;
  }
`
const RootWrapper = styled.div`
  background-image: linear-gradient(${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`

export default DeviceSelector
