import canvas from '../constants/canvas'
import Draw from './Draw'
import Resource, { GifObject } from '../engine/ResourceLoader'

const SPEED = 1 // Fast: 0.5 Normal: 1
const updateTime = 34 * SPEED
const ActionPositionVertical = canvas.height - canvas.height / 14
const trajectoryStep = 2

const SpriteCat = {
  size: 100,
  ar: 0.74,
}

const jumpHeightMin = SpriteCat.size / 2
const jumpHeightMax = (SpriteCat.size * 3) / 2
const startCatX = canvas.width / 3
const startCatY = ActionPositionVertical
const startTargetX = canvas.width / 2
const startTargetY = ActionPositionVertical

let CatObj: GifObject = Resource.sprite.cat as GifObject

export default class Engine {
  private action: 'run' | 'stay' | 'jump' | 'path' | null
  private ctx: CanvasRenderingContext2D | null = null
  private hold: boolean
  private jumpHeight: number = jumpHeightMin
  private jumpStage = 0
  private trajectoryDirection = 1
  private CatX = startCatX
  private CatY = startCatY
  private targetHeight = 100
  private draw: Draw

  constructor(ctx: CanvasRenderingContext2D) {
    this.action = null
    this.ctx = ctx
    this.hold = false
    this.draw = new Draw(ctx)
  }

  private onkeydown = (event: KeyboardEvent) => {
    if (!this.hold && event.code == 'Space') {
      this.hold = true
      this.action = null // Stop all current actions
      setTimeout(() => {
        // Start a new action
        this.action = 'path'
        this.jumpHeight = jumpHeightMin
        this.trajectoryDirection = 1
        requestAnimationFrame(this.update)
      }, updateTime * 2)
    }
  }

  private onkeyup = (event: KeyboardEvent) => {
    if (this.hold && event.code == 'Space') {
      this.hold = false
      // this.action='stay';
      this.action = 'jump'
      this.jumpStage = -Math.PI
      console.log('Jump height: ', this.jumpHeight)
    }
  }

  private defineTrajectory = () => {
    this.jumpHeight += trajectoryStep * this.trajectoryDirection
    if (this.jumpHeight >= jumpHeightMax) this.trajectoryDirection = -1
    if (this.jumpHeight < jumpHeightMin) {
      // this.trajectoryDirection = 1
      this.action = 'stay'
      this.jumpStage = -Math.PI
      requestAnimationFrame(this.update)
    }
    this.draw.drawTrajectory(this.CatX, this.CatY, this.jumpHeight)
  }

  private defineJump = () => {
    const r = this.jumpHeight // радиус
    const points = r / 4 // количество точек
    const step = Math.PI / points
    this.jumpStage += step
    const i = this.jumpStage
    if (i < 0) {
      this.CatX = startCatX + r + r * Math.cos(i)
      const y = this.CatY + r * Math.sin(i)
      // this.ctx!.fillRect(x, y, 3, 3);
      const frameIndex = Math.floor(((i + Math.PI) / Math.PI) * 3)
      // console.log(a);
      this.draw.drawCat(CatObj.frames[frameIndex].image, this.CatX, y)
    } else {
      this.action = 'run'
      requestAnimationFrame(this.update)
    }
    /*
			for (let i = -Math.PI; i < 0; i += step) {
				const x = this.CatX + r + r * Math.cos(i);
				const y = this.CatY + r * Math.sin(i);
				this.ctx!.fillRect(x, y, 2, 2);
			}
*/
  }

  // Main update function
  private update = (timer: number) => {
    if (this.ctx && Resource.sprite.cat && !Resource.sprite.cat.loading) {
      if (!CatObj) CatObj = Resource.sprite.cat as GifObject
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.draw.drawTarget(Resource.sprite.cactus)
      switch (this.action) {
        case 'run':
          console.log('render run')
          this.draw.drawCat(CatObj.image, this.CatX, this.CatY)
          break
        case 'path':
          console.log('render trajectory')
          this.defineTrajectory()
          this.draw.drawCat(CatObj.frames[0].image, this.CatX, this.CatY)
          break
        case 'jump':
          console.log('render jump')
          this.defineJump()
          break
        default: //'stay'
          this.draw.drawCat(CatObj.frames[2].image, this.CatX, this.CatY)
      }
      if (
        this.action == 'run' ||
        this.action == 'path' ||
        this.action == 'jump'
      )
        setTimeout(this.update, updateTime)
    } else {
      console.log('Waiting for GIF image')
      setTimeout(this.update, 500)
    }
  }

  private registerEvents = () => {
    window.addEventListener('keydown', this.onkeydown)
    window.addEventListener('keyup', this.onkeyup)
    console.log('registerEvents')
  }

  private unRegister = () => {
    window.removeEventListener('keydown', this.onkeydown)
    window.removeEventListener('keyup', this.onkeyup)
    console.log('unRegister')
  }

	public start(){
		this.registerEvents()
		requestAnimationFrame(this.update)
	}

	public stop(){
		this.unRegister()
	}
}
