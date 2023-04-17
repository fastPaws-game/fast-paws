import { Component, ReactPropTypes, RefObject, createRef } from 'react'
import styled from 'styled-components'
import { CANVAS } from '../constants/game'
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
    }
  }

  render() {
    return (
      <Wrapper>
        <canvas ref={this.canvas} width={CANVAS.width} height={CANVAS.height} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
`
