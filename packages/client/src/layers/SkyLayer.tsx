import { Component, ReactPropTypes, RefObject, createRef } from 'react'
import styled from 'styled-components'
import canvas from '../constants/canvas'
import ResourceLoader from '../engine/ResourceLoader'

export default class SkyLayer extends Component {
  private canvas: RefObject<HTMLCanvasElement> | undefined

  constructor(props: ReactPropTypes) {
    super(props)
    this.canvas = createRef<HTMLCanvasElement>()
  }

  componentDidMount() {
    const ctx = this.canvas!.current!.getContext('2d')
    const img = ResourceLoader.sprite['layer1'] as HTMLImageElement

    const aspectRatio = img.height / img.width 
    img.width = canvas.width
    img.height = Math.floor(img.width * aspectRatio)
    
    // const multiplier = canvas.width / img.width
    // img.width = canvas.width
    // img.height = img.height * multiplier

    if (ctx) {
      ctx.drawImage(img as CanvasImageSource, 0, 0, img.width, img.height)
    }
  }

  render() {
    return (
      <Layer>
        <canvas ref={this.canvas} width={canvas.width} height={canvas.height} />
      </Layer>
    )
  }
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
