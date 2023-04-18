import { CANVAS } from '../constants/game'
import Resource from './ResourceLoader'
import { getValue } from '../utils/data_utils'

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
  { src: 'MistyMountains.layer1', dx: 0, isTop: true },
  { src: 'MistyMountains.layer2', dx: -1 },
  { src: 'MistyMountains.layer3', dx: -4 },
]

export default class BgMotion {
  private ctx: CanvasRenderingContext2D | null = null
  private timer: NodeJS.Timeout | null = null
  private layersArr: Layer[] = []
  private clearX = CANVAS.width
  private clearY = CANVAS.height
  private static __instance: BgMotion
  private resource = Resource.get()

  constructor(ctx?: CanvasRenderingContext2D) {
    if (BgMotion.__instance) return BgMotion.__instance
    // Need only for a first initialization of this singleton
    if (!ctx) return

    this.ctx = ctx
    this.init()

    BgMotion.__instance = this
  }

  private init = () => {
    // Developement time patch
    if (this.resource.progress < 100) {
      setTimeout(this.init, 500)
      return
    }

    layersData.forEach(layer => {
      const img = getValue(this.resource.sprite, layer.src) as HTMLImageElement
      const aspectRatio = img.height / img.width
      const layerObj: Layer = {
        img,
        dx: layer.dx,
        imgW: CANVAS.width,
        get imgH(): number {
          return this.imgW * aspectRatio
        },
        x: 0,
        get y(): number {
          return layer.isTop ? 0 : CANVAS.height - this.imgH
        },
      }
      this.layersArr.push(layerObj)
    })
  }

  private draw = () => {
    this.ctx?.clearRect(0, 0, this.clearX, this.clearY)
    this.layersArr.forEach(layer => {
      if (layer.x <= -CANVAS.width) {
        layer.x = 0
      }

      if (layer.x > -CANVAS.width) {
        this.ctx?.drawImage(layer.img as CanvasImageSource, CANVAS.width + layer.x, layer.y, layer.imgW, layer.imgH)
      }

      this.ctx?.drawImage(layer.img as CanvasImageSource, layer.x, layer.y, layer.imgW, layer.imgH)
      layer.x += layer.dx
    })
  }

  public start(speed = 20) {
    this.stop()
    this.timer = setInterval(this.draw, speed)
  }

  public stop() {
    if (this.timer) clearInterval(this.timer)
  }
}
