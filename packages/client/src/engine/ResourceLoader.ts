import catUrl from '../assets/sprites/cat-orange.gif'
import cactusUrl from '../assets/sprites/cactus-green.png'
import puddleUrl from '../assets/sprites/water-puddle.png'
import birdUrl from '../assets/sprites/bird-yellow.gif'
import butterflyUrl from '../assets/sprites/butterfly-orange.gif'
import flowerpotUrl from '../assets/sprites/flowerpot-empty.png'
import gnomeUrl from '../assets/sprites/garden-gnome.png'
import grasshopperUrl from '../assets/sprites/grasshopper.gif'
import mouseUrl from '../assets/sprites/mouse-brown.gif'
import layer1Url from '../assets/background/layer_1.png'
import layer2Url from '../assets/background/layer_2.png'
import layer3Url from '../assets/background/layer_3.png'

// @ts-ignore
import GIF from '../utils/gif.js'

export type GifObject = {
  onerror: (e: any) => void
  load: (url: string) => void
  onloadall: (res: { type: 'loadall'; obj: GifObject }) => void
  frames: { image: HTMLCanvasElement }[]
  loading: any
  image: HTMLCanvasElement
  lastFrame: { image: HTMLCanvasElement } | null
  width: number
  height: number
  src: string
  currentFrame: number
  frameCount: number
}

export class Resource {
  public progress = 0 // 0 - 100 in percents
  private total = 9 // Resource count
  private current = 0

  protected static _instance: Resource
  protected static _initialized = false
  protected static _progresCallback: (progress: number) => void
  public sprite: Record<string, HTMLImageElement | GifObject> = {}

  private constructor() {
    this.initialize()
  }

  public static get(progresCallback: (progress: number) => void) {
    if (Resource._instance) return Resource._instance
    Resource._progresCallback = progresCallback
    return (Resource._instance = new Resource())
  }

  private countOne = () => {
    this.current += 1
    this.progress = Math.floor((this.current / this.total) * 100)
    Resource._progresCallback(this.progress)
  }

  private loadGif = (name: string, url: string) => {
    // Timeout just waits till script has been parsed and executed then starts loading a gif
    setTimeout(() => {
      const newGif: GifObject = GIF() // creates a new gif
      newGif.onerror = function (err) {
        console.log('Gif loading error ' + err.type)
      }
      newGif.onloadall = res => {
        // console.log('Loaded gif:', name) // res.obj.src
        const dimensions = {
          width: res.obj.width,
          height: res.obj.height,
        }
        this.countOne()
      }
      newGif.load(url)

      this.sprite[name] = newGif
      return newGif
    }, 0)
  }

  private loadImg = (name: string, url: string): HTMLImageElement => {
    const newImg = document.createElement('img')
    newImg.src = url
    newImg.onload = () => {
      // console.log('Loaded img:', name) // url
      const dimensions = {
        width: newImg.width,
        height: newImg.height,
      }
      this.countOne()
    }
    newImg.onerror = function (err) {
      console.log('Img loading error:', err)
    }
    this.sprite[name] = newImg
    return newImg
  }

  public initialize = () => {
    // Starts loading resources
    if (!Resource._initialized) {
      this.loadGif('cat', catUrl)
      this.loadGif('mouse', mouseUrl)
      this.loadGif('grasshopper', grasshopperUrl)
      this.loadGif('butterfly', butterflyUrl)
      this.loadGif('bird', birdUrl)

      this.loadImg('cactus', cactusUrl)
      this.loadImg('puddle', puddleUrl)
      this.loadImg('flowerpot', flowerpotUrl)
      this.loadImg('gnome', gnomeUrl)

      this.loadImg('layer1', layer1Url)
      this.loadImg('layer2', layer2Url)
      this.loadImg('layer3', layer3Url)
    }
  }
}

// Future preloader callback
const tempCallback = (progress: number) => {
  console.log(`Resource loading: ${progress}%`)
}

export default Resource.get(tempCallback)
