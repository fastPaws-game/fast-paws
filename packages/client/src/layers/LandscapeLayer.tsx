import React from 'react'
import styled from 'styled-components'
import canvas from '../constants/canvas'
import bg from '../assets/background/landscape_720.jpg'

export default function LandscapeLayer() {
  const image = React.createRef<HTMLImageElement>()

  return (
    <Layer>
      <img src={bg} ref={image} height={canvas.height} />
    </Layer>
  )
}

const Layer = styled.div`
  z-index: 1;
  height: ${canvas.height}px;
  width: ${canvas.width}px;
  position: absolute;
  left: 0px;
  top: 0px;
  overflow: clip;
`
