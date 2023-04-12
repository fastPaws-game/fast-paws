import canvas from '../constants/canvas'
import Resource, { GifObject } from '../engine/ResourceLoader'

const ActionPositionVertical = canvas.height - canvas.height / 14

const SpriteCat = {
  width: 100,
  height: 74,
  ar: 0.74,
}

const startTargetX = canvas.width / 2
const startTargetY = ActionPositionVertical
const startCatX = canvas.width / 3
const startCatY = ActionPositionVertical

export default class Draw {
  private ctx: CanvasRenderingContext2D | null = null
  private targetHeight = 100
  private catHeight = 74

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  private drawShadow = (x: number, y: number, w: number) => {
    if (this.ctx) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      this.ctx.beginPath()
      this.ctx.ellipse(x, y, w / 4, w / 10, 0, 0, 2 * Math.PI)
      this.ctx.fill()
    }
  }

  public drawCat = (image: HTMLCanvasElement, x: number, y: number) => {
    if (this.ctx) {
      const h = SpriteCat.height
      const w = (image.width * h) / image.height

      this.drawShadow(x, startCatY, w)
      this.ctx.drawImage(image, x - w / 2, y - h, w, h)
    }
  }

  public drawTrajectory = (x: number, y: number, j: number) => {
    if (this.ctx) {
      const w = SpriteCat.width

      // Outer path
      this.ctx.strokeStyle = 'rgba(70, 119, 24, 0.5)'
      this.ctx.beginPath()
      this.ctx.ellipse(x + j, y - 10, j, j, 0, Math.PI, 0)
      this.ctx.lineWidth = 4
      this.ctx.lineCap = 'round'
      this.ctx.stroke()

      // Inner path
      this.ctx.strokeStyle = 'rgba(122, 208, 41, 1)'
      this.ctx.beginPath()
      this.ctx.ellipse(x + j, y - 10, j, j, 0, Math.PI, 0)
      this.ctx.lineWidth = 2
      this.ctx.stroke()

      this.drawShadow(x + j * 2, y, w)
    }
  }

  public drawTarget = (image: HTMLImageElement | GifObject) => {
    if (image instanceof HTMLImageElement) {
      const h = this.targetHeight
      const w = (image.width * h) / image.height
      const x = startTargetX - w / 2
      const y = startTargetY - h
      this.drawShadow(startTargetX, startTargetY, w)
      this.ctx!.drawImage(image, x, y, w, h)
    }
  }
}
