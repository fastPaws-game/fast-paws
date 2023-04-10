import { Component, RefObject, SyntheticEvent, createRef } from 'react'
import styled from 'styled-components'
import canvas from '../constants/canvas'
import bg from '../assets/background/gameBackground.jpg'

export default class LanscapeLayer extends Component {
  private image: RefObject<HTMLImageElement> | undefined
  private canvas: RefObject<HTMLCanvasElement> | undefined
  private img: HTMLImageElement | null
  private speed = 20
  private scale = 1.05
  private y = 0
  private x = 0
  private dx = 0.75
  private imgW = 0
  private imgH = 0
  private clearX = 0
  private clearY = 0

  constructor(props: any) {
    super(props)
    this.image = createRef<HTMLImageElement>()
    this.canvas = createRef<HTMLCanvasElement>()
    this.img = this.image.current
  }

  private handleOnLoad = (e: SyntheticEvent) => {
    this.img = e.target as HTMLImageElement
    this.imgW = this.img.width * this.scale
    this.imgH = this.img.height * this.scale

    if (this.imgW > canvas.width) {
      this.x = canvas.width - this.imgW
      this.clearX = this.imgW
    } else {
      this.clearX = canvas.width
    }

    if (this.imgH > canvas.height) {
      this.clearY = this.imgH
    } else {
      this.clearY = canvas.height
    }
  }

  componentDidMount() {
    setInterval(this.draw, this.speed)
    // setInterval(this.stop, this.speed)
  }

  public draw = () => {
    const ctx = this.canvas!.current!.getContext('2d')
    ctx?.clearRect(0, 0, this.clearX, this.clearY)
    if (this.imgW <= canvas.width) {
      if (this.x > canvas.width) this.x = 0
      if (this.x > canvas.width - this.imgW)
        ctx?.drawImage(
          this.img as CanvasImageSource,
          this.x - canvas.width + 1,
          this.y,
          this.imgW,
          this.imgH
        )
    } else {
      if (this.x > canvas.width) this.x = canvas.width - this.imgW
      if (this.x > canvas.width - this.imgW)
        ctx?.drawImage(
          this.img as CanvasImageSource,
          this.x - this.imgW + 1,
          this.y,
          this.imgW,
          this.imgH
        )
    }

    ctx?.drawImage(
      this.img as CanvasImageSource,
      this.x,
      this.y,
      this.imgW,
      this.imgH
    )
    this.x += this.dx
  }

  public stop = () => {
    const ctx = this.canvas!.current!.getContext('2d')
    ctx?.drawImage(
      this.img as CanvasImageSource,
      this.x,
      this.y,
      this.imgW,
      this.imgH
    )
  }

  render() {
    return (
      <Layer>
        <canvas ref={this.canvas} width={canvas.width} height={canvas.height}>
          <img
            onLoad={this.handleOnLoad}
            src={bg}
            ref={this.image}
            width={canvas.width}
            height={canvas.height}
          />
        </canvas>
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
