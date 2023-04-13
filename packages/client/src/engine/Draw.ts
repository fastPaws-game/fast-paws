import { GAME, SpriteSize } from '../constants/game'
import Resource, { GifObject } from '../engine/ResourceLoader'

export default class Draw {
  private ctx: CanvasRenderingContext2D | null = null

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  private drawShadow = (x: number, y: number, width: number, force = false) => {
    if (!this.ctx) return

    if (GAME.shadowsEnable || force) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      this.ctx.beginPath()
      this.ctx.ellipse(x, y, width / 4, width / 10, 0, 0, 2 * Math.PI)
      this.ctx.fill()
    }
  }

  public drawObject = (image: HTMLCanvasElement, x: number, y: number, height: number) => {
    if (this.ctx) {
      const width = (image.width * height) / image.height

      this.drawShadow(x, GAME.ActionPositionVertical, width)
      this.ctx.drawImage(image, x - width / 2, y - height, width, height)
    }
  }

  public drawCat = (image: HTMLCanvasElement, x: number, y: number) => {
    this.drawObject(image, x, y, SpriteSize.cat.height)
  }

  public drawTrajectory = (x: number, y: number, jumpHeight: number) => {
    if (this.ctx) {
      const width = SpriteSize.cat.width

      // Outer path
      this.ctx.strokeStyle = 'rgba(70, 119, 24, 0.5)'
      this.ctx.beginPath()
      this.ctx.ellipse(x + jumpHeight, y - 10, jumpHeight, jumpHeight, 0, Math.PI, 0)
      this.ctx.lineWidth = 4
      this.ctx.lineCap = 'round'
      this.ctx.stroke()

      // Inner path
      this.ctx.strokeStyle = 'rgba(122, 208, 41, 1)'
      this.ctx.beginPath()
      this.ctx.ellipse(x + jumpHeight, y - 10, jumpHeight, jumpHeight, 0, Math.PI, 0)
      this.ctx.lineWidth = 2
      this.ctx.stroke()

      this.drawShadow(x + jumpHeight * 2, y, width, true)
    }
  }

  public drawTarget = (name: string, x: number, y: number, height: number, animate = false) => {
    const image: HTMLImageElement | GifObject = Resource.sprite[name]
    if (image instanceof HTMLImageElement) {
      let width = (image.width * height) / image.height
      let newY = Math.floor(y - height * 0.9)
      if (name == 'puddle') {
        width = Math.floor(width / 1.2)
        height = height / 2
        newY = y - height / 2
      }
      const newX = x - width / 2
      // if (name != 'puddle') this.drawShadow(tx, ty, w)
      this.ctx!.drawImage(image, newX, newY, width, height)
    } else {
      // GifObject
      const frame = animate ? image.image : image.frames[image.frameCount - 1].image
      this.drawObject(frame, x, y + height / 8, height / 1.5)
    }
  }
}
