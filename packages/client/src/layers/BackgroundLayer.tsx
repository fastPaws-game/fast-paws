import { Component, ReactPropTypes, RefObject, createRef } from 'react'
import styled from 'styled-components'
import canvas from '../constants/canvas'
import BgMotion from '../engine/BgMotion'

export default class BackgroundLayer extends Component {
  private canvas: RefObject<HTMLCanvasElement> | undefined
  private motion: BgMotion | null = null

  constructor(props: ReactPropTypes) {
    super(props)
    this.canvas = createRef<HTMLCanvasElement>()
  }

  componentDidMount() {
    const ctx = this.canvas!.current!.getContext('2d')
    if (ctx) {
      this.motion = new BgMotion(ctx)
      this.motion.start(10)
    }
  }

  render() {
    return (
      <Wrapper>
        <canvas ref={this.canvas} width={canvas.width} height={canvas.height} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  z-index: 1;
  height: ${canvas.height}px;
  width: ${canvas.width}px;
  position: absolute;
  left: 0px;
  top: 0px;
  overflow: clip;
`
