import catUrl from '../assets/sprites/cat-orange.gif'
import cactusUrl from '../assets/sprites/cactus-green.png'
import puddleUrl from '../assets/sprites/water-puddle.png'
import birdUrl from '../assets/sprites/bird-yellow.gif'
import butterflyUrl from '../assets/sprites/butterfly-orange.gif'
import flowerpotUrl from '../assets/sprites/flowerpot-empty.png'
import gnomeUrl from '../assets/sprites/garden-gnome.png'
import grasshopperUrl from '../assets/sprites/grasshopper.gif'
import mouseUrl from '../assets/sprites/mouse-brown.gif'
import MistyMountains_layer1Url from '../assets/background/MistyMountains/layer_1.png'
import MistyMountains_layer2Url from '../assets/background/MistyMountains/layer_2.png'
import MistyMountains_layer3Url from '../assets/background/MistyMountains/layer_3.png'
import Mountains_musicUrl from '../assets/sounds/bg_mountains.mp3'

// @ts-ignore
import GIF from '../utils/gif.js'
import { setValue } from '../utils/data_utils'

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
  private total = 13 // Resource count
  private current = 0

  protected static __instance: Resource
  protected static _initialized = false
  protected static _progressCallback: (progress: number) => void
  public sprite: Record<string, HTMLImageElement | GifObject> = {}
  public audio: Record<string, HTMLAudioElement> = {}

  private constructor() {
    this.initialize()
  }

  private countOne = () => {
    this.current += 1
    this.progress = Math.floor((this.current / this.total) * 100)
    Resource._progressCallback(this.progress)
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
    setValue(this.sprite, name, newImg)
    // this.sprite[name] = newImg
    return newImg
  }

  private loadAudio = (name: string, url: string): HTMLAudioElement => {
    const newAudio = new Audio(url)
    newAudio.addEventListener('canplaythrough', () => {
      // console.log('Loaded audio:', name)
      this.countOne()
    })
    newAudio.onerror = function (err) {
      console.log('Audio loading error:', err)
    }
    setValue(this.audio, name, newAudio)
    return newAudio
  }

  private initialize = () => {
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

      this.loadImg('MistyMountains.layer1', MistyMountains_layer1Url)
      this.loadImg('MistyMountains.layer2', MistyMountains_layer2Url)
      this.loadImg('MistyMountains.layer3', MistyMountains_layer3Url)

      this.loadAudio('music.mountains', Mountains_musicUrl)
    }
  }

  public static get(progressCallback?: (progress: number) => void) {
    if (Resource.__instance) return Resource.__instance
    if (progressCallback) Resource._progressCallback = progressCallback
    return (Resource.__instance = new Resource())
  }
}

/* Callback example
const tempCallback = (progress: number) => {
  console.log(`Resource loading: ${progress}%`)
}
*/

export default Resource
