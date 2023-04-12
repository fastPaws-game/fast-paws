import canvas from '../constants/canvas'
import ResourceLoader from './ResourceLoader'

let y = 0
let x = 0
const dx = -1
let imgW = 0
let imgH = 0
let clearX = 0
let clearY = 0

export default class GroundMotion {
  private ctx: CanvasRenderingContext2D | null
  private img: HTMLImageElement | null
  private timer: NodeJS.Timeout | undefined
  private multiplier: number

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.img = ResourceLoader.sprite['layer3'] as HTMLImageElement
    this.multiplier = canvas.width / this.img.width
    this.img.width = canvas.width
    this.img.height = this.img.height * this.multiplier

    this.init()
  }

  private init() {
    if (this.img) {
      imgW = this.img.width
      imgH = this.img.height

      clearX = canvas.width
      clearY = canvas.height

      y = canvas.height - this.img.height
    }
  }

  public draw() {
    this.ctx?.clearRect(0, 0, clearX, clearY)
    if (x <= -canvas.width) x = 0
    if (x > -canvas.width)
      this.ctx?.drawImage(
        this.img as CanvasImageSource,
        canvas.width + x,
        y,
        imgW,
        imgH
      )

    this.ctx?.drawImage(this.img as CanvasImageSource, x, y, imgW, imgH)
    x += dx
  }

  public start(speed = 20) {
    this.timer = setInterval(this.draw.bind(this), speed)
  }

  public stop() {
    clearInterval(this.timer)
  }
}
