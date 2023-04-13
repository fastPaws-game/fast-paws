import { canvas } from '../constants/game'
import ResourceLoader from './ResourceLoader'

export type Layer = {
  img: HTMLImageElement | null
  x: number
  y: number
  dx: number
  imgW: number
  imgH: number
}

type LayersData = {
  src: string
  dx: number
  isTop?: boolean
}

const layersData: LayersData[] = [
  { src: 'layer1', dx: 0, isTop: true },
  { src: 'layer2', dx: -0.2 },
  { src: 'layer3', dx: -0.8 },
]

export default class BgMotion {
  private ctx: CanvasRenderingContext2D | null = null
  private timer: NodeJS.Timeout | null = null
  private layersArr: Layer[] = []
  private clearX = canvas.width
  private clearY = canvas.height
  private static _instance: BgMotion

  constructor(ctx: CanvasRenderingContext2D) {
    if (!ctx) return

    if (BgMotion._instance) {
      return BgMotion._instance
    }

    this.ctx = ctx
    layersData.forEach(layer => {
      const layerObj: Layer = {
        img: null,
        x: 0,
        y: 0,
        dx: 0,
        imgW: 0,
        imgH: 0,
      }
      const img = ResourceLoader.sprite[layer.src] as HTMLImageElement
      layerObj.img = img
      layerObj.x = 0
      layerObj.dx = layer.dx
      const aspectRatio = img.height / img.width
      layerObj.imgW = canvas.width
      layerObj.imgH = layerObj.imgW * aspectRatio
      layer.isTop ? (layerObj.y = 0) : (layerObj.y = canvas.height - layerObj.imgH)
      this.layersArr.push(layerObj)
    })

    BgMotion._instance = this
  }

  public draw() {
    this.ctx?.clearRect(0, 0, this.clearX, this.clearY)
    this.layersArr.forEach(layer => {
      if (layer.x <= -canvas.width) {
        layer.x = 0
      }

      if (layer.x > -canvas.width)
        this.ctx?.drawImage(layer.img as CanvasImageSource, canvas.width + layer.x, layer.y, layer.imgW, layer.imgH)

      this.ctx?.drawImage(layer.img as CanvasImageSource, layer.x, layer.y, layer.imgW, layer.imgH)
      layer.x += layer.dx
    })
  }

  public start(speed = 20) {
    if (!this.timer) this.timer = setInterval(this.draw.bind(this), speed)
  }

  public stop() {
    if (this.timer) clearInterval(this.timer)
  }
}
