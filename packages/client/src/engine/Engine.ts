import {
  canvas,
  GAME,
  TARGET_SCORE,
  TargetName,
  VICTIM_LIST,
  BARRIER_LIST,
  DIFFICULTY_PER_LEVEL,
} from '../constants/game'
import Draw from './Draw'
import Resource, { GifObject } from '../engine/ResourceLoader'
import BgMotion from '../engine/BgMotion'

type Action = 'run' | 'stay' | 'jump' | 'path' | 'scene' | 'return' | null
type Target = {
  nameCurr: TargetName
  nameLast: TargetName
  xCurr: number
  yCurr: number
  PositionX: number // A place where a target will stop
  xLast: number
  yLast: number
  heightCurr: number
  heightLast: number
  isBarrier: boolean
  runAwayDelay: number
}

export default class Engine {
  private SPEED = 0.5 // Game complexity refers to current level (Slow: 0.5 Max: 1)
  private successHeightModifer = 1.2 // Defines jump to target height ratio
  private updateTime = 17 / this.SPEED // Frame rait, actually no, but :)
  private action: Action = null
  private ctx: CanvasRenderingContext2D | null = null
  private hold = false
  private jumpHeight: number = GAME.jumpHeightMin
  private jumpStage = 0
  private trajectoryDirection = 1
  private CatX: number = GAME.defaultCatX
  private CatY: number = GAME.defaultCatY
  private target: Target = {
    nameCurr: 'none',
    nameLast: 'none',
    xCurr: this.CatX + canvas.width / 2,
    yCurr: GAME.defaultTargetY,
    xLast: GAME.defaultTargetX,
    yLast: GAME.defaultTargetY,
    PositionX: GAME.defaultTargetX,
    heightCurr: GAME.defaultTargetHeight,
    heightLast: GAME.defaultTargetHeight,
    isBarrier: false,
    runAwayDelay: GAME.defaultRunAwayDelay,
  }
  private timer = 0
  private movementSpeed = 6
  private runAwaySpeed = 6
  private successHeight = GAME.defaultTargetHeight * this.successHeightModifer
  private success = false
  private fullJump = true
  private score: number
  private paused = false
  private CatAtPosition = false
	private tooltipShown = true
  private cat: GifObject
  private draw: Draw
  private bgMotion: BgMotion
  private handlePause: () => void
  private handleGameOver: () => void
  private showScore: (score: number) => void
  private showLevel: (score: number) => void
  private showTooltip: (tooltip: string) => void
  private static __instance: Engine

  private constructor(handlers: Record<string, (value?: any) => void>) {
    this.handlePause = handlers.handlePause
    this.handleGameOver = handlers.handleGameOver
    this.showLevel = handlers.setLevel
    this.showScore = handlers.setScore
    this.showTooltip = handlers.setTooltip

    const canvas = document.getElementById('game_canvas') as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
    this.draw = new Draw(this.ctx!)
    this.bgMotion = new BgMotion()

    this.cat = Resource.sprite.cat as GifObject
    this.score = GAME.initialScore // Get score from store
  }

	private setTooltip(text?: string) {
		if (!text && this.tooltipShown) {
			this.showTooltip('')
			this.tooltipShown = false
			return
		}
		if (typeof text == 'string') {
			this.showTooltip(text)
			this.tooltipShown = true
		}
	}

  private setScore = (value: number) => {
    this.score += value
		this.showScore(this.score)
		this.setTooltip()
    console.log((value > 0 ? 'Success!' : 'Fail.') + ' Score:', this.score)
  }

  private commitFail = () => {
    if (this.score + TARGET_SCORE[this.target.nameCurr].fail < 0) {
      this.score = GAME.initialScore
      this.paused = true
      console.log('Game over')
      this.handleGameOver()
      return
    }
    this.hold = true
    this.success = false
    this.action = 'return'
    this.setScore(TARGET_SCORE[this.target.nameCurr].fail)
    if (!this.target.isBarrier) this.levelPrepare()
  }

  private commitSuccess = () => {
    this.setScore(TARGET_SCORE[this.target.nameCurr].success)
    if (!this.target.isBarrier) this.target.nameCurr = 'none'
    this.levelPrepare()
  }

  private onkeydown = (event: KeyboardEvent) => {
    if (!this.hold && event.code == 'Space') {
      this.hold = true
      this.action = null // Stop all current actions
      setTimeout(() => {
        // Wait till all actions will be stoped
        // Start a new jump request
        this.action = 'path'
        this.jumpHeight = GAME.jumpHeightMin
        this.trajectoryDirection = 1
        requestAnimationFrame(this.update)
      }, this.updateTime * 2)
    }
  }

  private onkeyup = (event: KeyboardEvent) => {
    if (this.hold && event.code == 'Space') {
      this.hold = false
      this.action = 'stay'
      // Prevent accidentially tapping
      if (this.jumpHeight > GAME.jumpHeightMin + GAME.trajectoryStep * 2) {
        this.action = 'jump'
        this.jumpStage = -Math.PI
        this.success =
          (this.target.isBarrier && this.jumpHeight > this.successHeight) ||
          Math.abs(this.jumpHeight - this.successHeight) < 10
        // console.log('Jump height: ', this.jumpHeight, '/', this.successHeight, this.success)	// Do not remove!
      }
    }
    if (event.code == 'Escape') {
      this.pause(true)
    }
  }

  private defineTrajectory = () => {
    this.jumpHeight += GAME.trajectoryStep * this.trajectoryDirection
    if (this.jumpHeight >= GAME.jumpHeightMax) this.trajectoryDirection = -1
    if (this.jumpHeight < GAME.jumpHeightMin) {
      // Stops jump request
      this.action = 'stay'
      this.jumpStage = -Math.PI
      requestAnimationFrame(this.update)
    }
    this.draw.drawTrajectory(this.CatX, this.CatY, this.jumpHeight)
  }

  private defineJump = () => {
    const r = this.jumpHeight // Circle radius
    const points = r / 4 // Position count
    const step = Math.PI / points
    this.jumpStage += step
    const i = this.jumpStage
    if (!this.fullJump && !this.success && i > -Math.PI / 2) {
      this.commitFail()
    }
    if (i < 0) {
      this.CatX = GAME.defaultCatX + r + r * Math.cos(i)
      const y = this.CatY + r * Math.sin(i)
      const frameIndex = Math.floor(((i + Math.PI) / Math.PI) * 3)
      this.draw.drawCat(this.cat.frames[frameIndex].image, this.CatX, y)
    } else {
      this.success ? this.commitSuccess() : this.commitFail()
    }
    /*	Trajectory algorithm
			for (let i = -Math.PI; i < 0; i += step) {
				const x = this.CatX + r + r * Math.cos(i);
				const y = this.CatY + r * Math.sin(i);
				this.ctx!.fillRect(x, y, 2, 2);
			}
*/
  }

  private sceneChange = () => {
    // Move last target
    if (this.target.nameLast != 'none') {
      this.runAway()

      this.draw.drawTarget(
        this.target.nameLast,
        this.target.xLast,
        this.target.yLast,
        this.target.heightLast,
        !this.success
      )
      if (this.target.xLast < 0 || this.target.xLast > canvas.width) this.target.nameLast = 'none'
    }

    // Move current target
    this.target.xCurr -= this.movementSpeed
    if (this.target.xCurr <= this.target.PositionX) {
      this.action = 'stay'
      this.hold = false
      if (!this.target.isBarrier) {
        this.timer = window.setTimeout(this.commitFail, this.target.runAwayDelay)
      }
      this.bgMotion.stop()
    }

    // Move Cat
    if (this.CatX > GAME.defaultCatX) {
      this.CatX -= Math.floor((this.movementSpeed / 3) * 2)
    } else {
      if (!this.CatAtPosition) this.bgMotion.start(Math.floor((this.updateTime / 2) * 3))
      this.CatAtPosition = true
      if (this.target.nameLast != 'none') {
        // this.movementSpeed = 4
      }
    }
  }

  private runAway = () => {
    if (this.target.nameLast == 'butterfly' || this.target.nameLast == 'bird') {
      this.target.xLast -= this.runAwaySpeed
      this.target.yLast -= this.target.nameLast == 'butterfly' ? Math.random() * 6 : 4
      return
    }

    if (this.target.nameLast == 'grasshopper') {
      this.target.xLast -= this.runAwaySpeed
      return
    }

    if (this.target.nameLast == 'mouse') {
      this.target.xLast += this.runAwaySpeed
      return
    }

    this.target.xLast -= this.movementSpeed
    return
  }

  private sceneReturn = () => {
    // Move Cat
    if (this.CatX > GAME.defaultCatX) {
      this.CatX -= 6
    } else {
      this.action = 'stay'
      this.hold = false
    }
  }

  private movingCat = () => {
    this.draw.drawCat(this.cat.image, this.CatX, this.CatY)
    setTimeout(this.update, this.updateTime)
  }

  // Renders one frame
  private render = () => {
    if (!this.cat) this.cat = Resource.sprite.cat as GifObject // Development time patch

    this.ctx!.clearRect(0, 0, canvas.width, canvas.height)
    this.draw.drawTarget(this.target.nameCurr, this.target.xCurr, this.target.yCurr, this.target.heightCurr)

    switch (this.action) {
      case 'return':
        this.sceneReturn()
        this.movingCat()
        break
      case 'scene':
        this.sceneChange()
        this.movingCat()
        break
      case 'run':
        this.movingCat()
        break
      case 'path':
        this.defineTrajectory()
        this.draw.drawCat(this.cat.frames[0].image, this.CatX, this.CatY)
        setTimeout(this.update, this.updateTime)
        break
      case 'jump':
        this.defineJump()
        setTimeout(this.update, this.updateTime)
        break
      default: //'stay'
        this.draw.drawCat(this.cat.frames[2].image, this.CatX, this.CatY)
      // if (!this.isBarrier && this.timestamp + this.targetDelay < Date.now()) this.commitFail();
    }
  }

  // Main update function
  private update = (timer: number) => {
    if (!this.paused && this.ctx) {
      if (Resource.sprite.cat && !Resource.sprite.cat.loading) {
        this.render()
      } else {
        console.log('Waiting for GIF image')
        setTimeout(this.update, 500)
      }
    }
  }

  private levelPrepare = () => {
    window.clearTimeout(this.timer)
    const level = Math.min(Math.floor(Math.max(this.score, 0) / GAME.scorePerLevel), 5)
    this.showLevel(level)
    this.showScore(this.score)

    this.SPEED = 0.5 + level * 0.1
    this.updateTime = 17 / this.SPEED
    const targets = DIFFICULTY_PER_LEVEL[level]
    const rand = Math.floor(Math.random() * targets.length)
    this.target.nameLast = this.target.nameCurr
    this.target.heightLast = this.target.heightCurr
    this.target.xLast = this.target.xCurr
    this.target.yLast = this.target.yCurr
    this.target.xCurr = Math.max(this.CatX + canvas.width / 2, canvas.width)
    this.target.yCurr = GAME.defaultTargetY
    this.target.nameCurr = targets[rand]
    this.target.isBarrier = BARRIER_LIST.includes(this.target.nameCurr)
    this.target.PositionX = this.target.isBarrier
      ? GAME.defaultTargetX
      : GAME.defaultTargetX + Math.floor(Math.random() * GAME.victimPositionDelta)
    this.target.heightCurr = this.target.isBarrier
      ? GAME.defaultTargetHeight + GAME.stepTargetHeight * level
      : GAME.defaultTargetHeight
    this.target.runAwayDelay = GAME.defaultRunAwayDelay - GAME.stepTargetDelay * level
    this.action = 'scene'
    this.hold = true
    this.paused = false
    this.movementSpeed = 6
    this.successHeight = this.target.isBarrier
      ? Math.floor(this.target.heightCurr * this.successHeightModifer)
      : (this.target.PositionX - GAME.defaultCatX) / 2
    this.fullJump = this.target.nameCurr == 'puddle' || VICTIM_LIST.includes(this.target.nameCurr)
    this.CatAtPosition = false
    /* 
		console.log(`Level ${level}:`, {
			speed: this.SPEED,
			rand: `${rand}/${targets.length}`,
			target: this.target,
		})
 */
    this.bgMotion.start(this.updateTime)
    requestAnimationFrame(this.update)
    // console.log('Game: Initialized', this.bgMotion)
  }

  private registerEvents = () => {
    window.addEventListener('keydown', this.onkeydown)
    window.addEventListener('keyup', this.onkeyup)
  }

  private unRegister = () => {
    window.removeEventListener('keydown', this.onkeydown)
    window.removeEventListener('keyup', this.onkeyup)
  }

  public start() {
    this.registerEvents()
    this.levelPrepare()
  }

  public stop() {
    this.unRegister()
  }

  public pause = (state: boolean) => {
    if (this.paused == state) return
    this.paused = state
    console.log(`Game: ${this.paused ? 'Pause' : 'Continue'}`)
    if (this.paused) {
      this.unRegister()
      this.handlePause()
      window.clearTimeout(this.timer)
    } else {
      this.registerEvents()
      requestAnimationFrame(this.update)
    }
  }

  public static get(handlers?: Record<string, () => void>) {
    if (Engine.__instance) return Engine.__instance
    if (handlers) Engine.__instance = new Engine(handlers)
    return Engine.__instance
  }
}
