import { game, SpriteCat } from '../constants/game'
import Resource, { GifObject } from '../engine/ResourceLoader'

export default class Draw {
  private ctx: CanvasRenderingContext2D | null = null

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  private drawShadow = (x: number, y: number, w: number, force = false) => {
    if (this.ctx) {
			if (game.shadowsEnable || force) {
				this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
				this.ctx.beginPath()
				this.ctx.ellipse(x, y, w / 4, w / 10, 0, 0, 2 * Math.PI)
				this.ctx.fill()
			}
    }
  }

  public drawObject = (image: HTMLCanvasElement, x: number, y: number, h: number) => {
    if (this.ctx) {
      const w = (image.width * h) / image.height

      this.drawShadow(x, game.ActionPositionVertical, w)
      this.ctx.drawImage(image, x - w / 2, y - h, w, h)
    }
  }

  public drawCat = (image: HTMLCanvasElement, x: number, y: number) => {
		this.drawObject(image, x, y, SpriteCat.height)
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

      this.drawShadow(x + j * 2, y, w, true)
    }
  }

  public drawTarget = (name: string, tx: number, ty: number, h: number, animate=false) => {
		const image: HTMLImageElement | GifObject = Resource.sprite[name];
    if (image instanceof HTMLImageElement) {
			let w = (image.width * h) / image.height
			let y = Math.floor(ty - h * 0.9)
			if (name == 'puddle') {
				w = Math.floor(w / 1.2)
				h = h / 2
				y = ty - h / 2
			}
			const x = tx - w / 2
			// if (name != 'puddle') this.drawShadow(tx, ty, w)
      this.ctx!.drawImage(image, x, y, w, h)
    } else {	// GifObject
			const farame = animate ? image.image : image.frames[image.frameCount-1].image
      this.drawObject(farame, tx, ty + h / 8, h / 1.5)
    }
  }
}
