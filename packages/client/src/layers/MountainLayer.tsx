import { Component, ReactPropTypes, RefObject, createRef } from 'react'
import styled from 'styled-components'
import canvas from '../constants/canvas'
import BgMotion, { Layer } from '../engine/BgMotion'

const layers: Layer[] = [
  {
    img: 'layer2',
    speed: 70
  },
  {
    img: 'layer3',
  }
]

export default class MountainLayer extends Component {
  private canvas: RefObject<HTMLCanvasElement> | undefined
  private motion: BgMotion | null = null

  constructor(props: ReactPropTypes) {
    super(props)
    this.canvas = createRef<HTMLCanvasElement>()
  }

  componentDidMount() {
    const ctx = this.canvas!.current!.getContext('2d')
    if (ctx) {
      // this.motion = new BgMotion(ctx, 'layer2')
      // this.motion.start(70)

      layers.forEach((layer) => {
        this.motion = new BgMotion(ctx, layer)
        this.motion.start(layer.speed)
      })

      // const engine1 = new BgMotion(ctx, layers[0])
      // engine1.start(70)

      // const engine2 = new BgMotion(ctx, layers[1])
      // engine2.start()
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
  z-index: 2;
  height: ${canvas.height}px;
  width: ${canvas.width}px;
  position: absolute;
  left: 0px;
  top: 0px;
  overflow: clip;
`
