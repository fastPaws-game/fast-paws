import { Component, ReactPropTypes, RefObject, createRef } from 'react'
import styled from 'styled-components'
import canvas from '../constants/canvas'
import GroundMotion from '../engine/GroundMotion'

export default class GroundLayer extends Component {
  private canvas: RefObject<HTMLCanvasElement> | undefined
  private motion: GroundMotion | null = null

  constructor(props: ReactPropTypes) {
    super(props)
    this.canvas = createRef<HTMLCanvasElement>()
  }

  componentDidMount() {
    const ctx = this.canvas!.current!.getContext('2d')
    if (ctx) {
      this.motion = new GroundMotion(ctx)
      this.motion.start(20)
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
  z-index: 3;
  height: ${canvas.height}px;
  width: ${canvas.width}px;
  position: absolute;
  left: 0px;
  top: 0px;
  overflow: clip;
`
