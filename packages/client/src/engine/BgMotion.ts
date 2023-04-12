import canvas from '../constants/canvas'
import ResourceLoader from './ResourceLoader'

export type Layer = {
    img: string,
    speed?: number,
}

export default class BgMotion {
    private ctx: CanvasRenderingContext2D | null
    private img: HTMLImageElement | null
    private timer: NodeJS.Timeout | undefined
    private multiplier: number
    private imgW: number
    private imgH: number
    private clearX: number
    private clearY: number
    private y: number
    private dx = -1
    private x: number

    constructor(ctx: CanvasRenderingContext2D, lay: Layer) {
        this.ctx = ctx
        this.img = ResourceLoader.sprite[lay.img] as HTMLImageElement

        this.x = 0
        this.multiplier = canvas.width / this.img.width
        this.img.width = canvas.width
        this.img.height = this.img.height * this.multiplier

        this.imgW = this.img.width
        this.imgH = this.img.height

        this.clearX = canvas.width
        this.clearY = canvas.height

        this.y = canvas.height - this.img.height
    }

    public draw() {
        this.ctx?.clearRect(0, 0, this.clearX, this.clearY)
        if (this.x <= -canvas.width) this.x = 0
        if (this.x > -canvas.width)
            this.ctx?.drawImage(
                this.img as CanvasImageSource,
                canvas.width + this.x,
                this.y,
                this.imgW,
                this.imgH
            )

        this.ctx?.drawImage(this.img as CanvasImageSource, this.x, this.y, this.imgW, this.imgH)
        this.x += this.dx
    }

    public start(speed = 20) {
        this.timer = setInterval(this.draw.bind(this), speed)
    }

    public stop() {
        clearInterval(this.timer)
    }
}
