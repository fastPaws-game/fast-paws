import { Component, ReactPropTypes, RefObject, createRef } from 'react'
import styled from 'styled-components'
import canvas from '../constants/canvas'
import Background from '../engine/BackgroundMotion'

export default class LanscapeLayer extends Component {
  private canvas: RefObject<HTMLCanvasElement> | undefined
  private background: Background | null = null

  constructor(props: ReactPropTypes) {
    super(props)
    this.canvas = createRef<HTMLCanvasElement>()
  }

  componentDidMount() {
    const ctx = this.canvas!.current!.getContext('2d')
    if (ctx) {
      this.background = new Background(ctx)
      this.background.start()

      // Демонстрация работы методов
      // setTimeout(this.background.stop.bind(this.background), 4000)
      // setTimeout(this.background.start.bind(this.background), 7000)
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
