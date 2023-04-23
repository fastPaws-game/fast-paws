import {
  CANVAS,
  GAME,
  TARGET_SCORE,
  TargetName,
  AnimalName,
  ANIMAL_LIST,
  BARRIER_LIST,
  DIFFICULTY_PER_LEVEL,
  TOOLTIP,
} from '../constants/game'
import Draw from './Draw'
import Resource, { GifObject } from '../engine/ResourceLoader'
import BgMotion from '../engine/BgMotion'
import FlyingValues from './FlyingValues'
import Queue from '../utils/Queue'
import { saveScore, saveCatched } from '../store/game/GameSlice'
import { store } from '../store'

type Action = 'run' | 'stay' | 'jump' | 'path' | 'scene' | 'return' | null
type Target = {
  nameCurr: TargetName
  nameLast: TargetName
  xCurr: number
  yCurr: number
  PositionX: number
  xLast: number
  yLast: number
  heightCurr: number
  heightLast: number
  isBarrier: boolean
  runAwayDelay: number
  atPosition: boolean
}
type TGame = {
  SPEED: number
  successHeightModifer: number
  updateTime: number
  action: Action
  ctx: CanvasRenderingContext2D | null
  definingTrajectory: boolean
  timer: number
  movementSpeed: number
  runAwaySpeed: number
  successHeight: number
  success: boolean
  fullJump: boolean
  paused: boolean
  combo: number
  tooltip: {
    shown: boolean
    firstTip: boolean
    firstVictim: boolean
    firstBarrier: boolean
    firstTimeout: boolean
  }
  score: number
  catched: {
    butterfly: number
    grasshopper: number
    frog: number
    bird: number
    mouse: number
  }
}
type TCat = {
  source: GifObject
  jumpHeight: number
  jumpStage: number
  trajectoryDirection: number
  CatX: number
  CatY: number
  atPosition: boolean
}

export default class Engine {
  private game: TGame = {
    SPEED: 0.5, // Game complexity refers to current level (Slow: 0.5 Max: 1)
    successHeightModifer: 1.3, // Defines jump to target height ratio
    // Frame rait, actually no :). Updates automatically.
    get updateTime(): number {
      return Math.floor(17 / this.SPEED)
    },
    action: null,
    ctx: null,
    definingTrajectory: false, // Jump attempt state
    timer: 0, // setTimeout link
    movementSpeed: 6,
    runAwaySpeed: 6,
    successHeight: GAME.defaultTargetHeight,
    success: false,
    fullJump: true, // To know does current target need a full jump
    paused: false,
    combo: 0, // Combo multiplier for score
    tooltip: {
      shown: false,
      firstTip: true,
      firstVictim: true,
      firstBarrier: true,
      firstTimeout: true,
    },
    score: GAME.initialScore,
    catched: {
      butterfly: 0,
      grasshopper: 0,
      frog: 0,
      bird: 0,
      mouse: 0,
    },
  }
  private cat: TCat = {
    source: {} as GifObject,
    jumpHeight: GAME.jumpHeightMin,
    jumpStage: 0,
    trajectoryDirection: 1,
    CatX: GAME.defaultCatX,
    CatY: GAME.defaultCatY,
    atPosition: false,
  }
  private target: Target = {
    nameCurr: 'none',
    nameLast: 'none',
    xCurr: this.cat.CatX + CANVAS.width / 2,
    yCurr: GAME.defaultTargetY,
    xLast: GAME.defaultTargetX,
    yLast: GAME.defaultTargetY,
    PositionX: GAME.defaultTargetX, // A place where a target will stop
    heightCurr: GAME.defaultTargetHeight,
    heightLast: GAME.defaultTargetHeight,
    isBarrier: false,
    runAwayDelay: GAME.defaultRunAwayDelay,
    atPosition: false,
  }
  private canvas: HTMLCanvasElement
  private resource: Resource
  private draw: Draw
  private fly: FlyingValues
  private bgMotion: BgMotion
  private meterStack = new Queue()
  private setPauseVisible: (pause: boolean) => void
  private handleGameOver: () => void
  private showLevel: (value: number) => void
  private showScore: (value: number) => void
  private showCombo: (value: number) => void
  private setTooltip: (tooltip: string) => void
  private setCatched: (catched: Record<string, number>) => void
  private static __instance: Engine

  private constructor(handlers: Record<string, (value?: any) => void>) {
    this.setPauseVisible = handlers.setPauseVisible
    this.handleGameOver = handlers.handleGameOver
    this.showLevel = handlers.setLevel
    this.showScore = handlers.setScore
    this.showCombo = handlers.setCombo
    this.setTooltip = handlers.setTooltip
    this.setCatched = handlers.setCatched

    this.canvas = document.getElementById('game_canvas') as HTMLCanvasElement
    this.game.ctx = this.canvas.getContext('2d')
    this.game.successHeight = GAME.defaultTargetHeight * this.game.successHeightModifer
    this.draw = new Draw(this.game.ctx!)
    this.fly = new FlyingValues(this.game.ctx!)
    this.bgMotion = new BgMotion()

    this.resource = Resource.get()
    this.cat.source = this.resource.sprite.cat as GifObject
  }

  private showTooltip(text?: string) {
    if (!text && this.game.tooltip.shown) {
      this.setTooltip('')
      this.game.tooltip.shown = false
      this.game.tooltip.firstTip = false
      return
    }
    if (typeof text == 'string') {
      this.setTooltip(text)
      this.game.tooltip.shown = true
    }
  }

  private showFirstTooltip = (reason?: 'timeout') => {
    if (this.target.isBarrier) {
      if (this.game.tooltip.firstBarrier) {
        this.game.tooltip.firstBarrier = false
        this.showTooltip(TOOLTIP.firstBarrier)
      }
      return
    }

    if (reason === 'timeout') {
      if (this.game.tooltip.firstTimeout) {
        this.game.tooltip.firstTimeout = false
        this.showTooltip(TOOLTIP.firstTimeout)
      }
      return
    }

    if (this.game.tooltip.firstVictim) {
      this.game.tooltip.firstVictim = false
      this.showTooltip(TOOLTIP.firstAnimal)
    }
  }

  private setScore = (value: number, multiplier = 1) => {
    const combo = Math.max(this.game.combo, 1)
    this.game.score += value * multiplier * combo
    this.showScore(this.game.score)
    store.dispatch(saveScore(this.game.score))
    if (value != 0) this.fly.throw(value * combo, multiplier, this.cat.CatX)
    if (this.game.success) this.showTooltip() // Hide tooltip
  }

  private commitFail = (reason?: 'timeout') => {
    if (this.game.score + TARGET_SCORE[this.target.nameCurr].fail < 0) {
      this.game.score = GAME.initialScore
      this.game.paused = true
      this.game.action = null
      this.handleGameOver()
      return
    }
    this.showFirstTooltip(reason)

    this.game.combo = 1
    this.showCombo(this.game.combo)
    this.game.success = false
    if (reason != 'timeout') {
      this.game.action = 'return'
    }
    this.setScore(TARGET_SCORE[this.target.nameCurr].fail)
    if (!this.target.isBarrier) this.levelPrepare()
  }

  private commitSuccess = () => {
    const multiplier = this.target.atPosition ? 1 : 2
    this.setScore(TARGET_SCORE[this.target.nameCurr].success, multiplier)
    if (!this.target.isBarrier) {
      if (this.game.combo < 5) {
        this.game.combo += 1
        if (this.game.combo > 1) {
          this.showCombo(this.game.combo)
          this.fly.throw('Combo:', this.game.combo, this.cat.CatX)
        }
      }
      const name: AnimalName = this.target.nameCurr as AnimalName
      this.game.catched[name] += 1
      this.setCatched(this.game.catched)
      store.dispatch(saveCatched({ ...this.game.catched }))
      this.target.nameCurr = 'none'
    }
    this.levelPrepare()
  }

  private prepareJumpStart() {
    this.cat.jumpHeight = GAME.jumpHeightMin
    this.cat.trajectoryDirection = 1
    this.game.definingTrajectory = true
    if (!this.updateIsNeeded()) requestAnimationFrame(this.update)
  }

  private prepareJumpEnd() {
    this.game.definingTrajectory = false
    // Prevent accidentially tapping
    if (this.cat.jumpHeight > GAME.jumpHeightMin + GAME.trajectoryStep * 2) {
      this.game.action = 'jump'
      this.cat.atPosition = false
      this.cat.jumpStage = -Math.PI
      this.game.successHeight = this.target.isBarrier
        ? Math.floor(
            this.target.heightCurr * this.game.successHeightModifer + (this.target.xCurr - this.target.PositionX) / 2
          )
        : Math.floor((this.target.xCurr - this.cat.CatX) / 2)
      this.game.success =
        (this.target.isBarrier && this.cat.jumpHeight > this.game.successHeight) ||
        Math.abs(this.cat.jumpHeight - this.game.successHeight) < GAME.catchRange
      // console.log('Jump height: ', this.cat.jumpHeight, '/', this.game.successHeight, this.game.success)	// Do not remove!
    }
  }

  private defineTrajectory = () => {
    this.cat.jumpHeight += GAME.trajectoryStep * this.cat.trajectoryDirection
    if (this.cat.jumpHeight >= GAME.jumpHeightMax) this.cat.trajectoryDirection = -1
    if (this.cat.jumpHeight < GAME.jumpHeightMin) {
      // Stops jump request
      this.game.action = 'stay'
      this.game.definingTrajectory = false
      this.cat.jumpStage = -Math.PI
    }
    this.draw.drawTrajectory(this.cat.CatX, this.cat.CatY, this.cat.jumpHeight)
  }

  private defineJump = () => {
    const r = this.cat.jumpHeight // Circle radius
    const points = r / 4 // Position count
    const step = Math.PI / points
    this.cat.jumpStage += step
    const i = this.cat.jumpStage
    if (!this.game.fullJump && !this.game.success && i > -Math.PI / 2) {
      this.commitFail()
    }
    if (i < 0) {
      this.cat.CatX = Math.floor(GAME.defaultCatX + r + r * Math.cos(i))
      const y = this.cat.CatY + r * Math.sin(i)
      const frameIndex = Math.floor(((i + Math.PI) / Math.PI) * 3)
      this.draw.drawCat(this.cat.source.frames[frameIndex].image, this.cat.CatX, y)
    } else {
      this.game.success ? this.commitSuccess() : this.commitFail()
    }
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
        !this.game.success
      )
      if (this.target.xLast < 0 || this.target.xLast > CANVAS.width) this.target.nameLast = 'none'
    }

    // Move current target
    this.target.xCurr -= this.cat.atPosition ? this.game.movementSpeed : Math.floor((this.game.movementSpeed / 2) * 3)
    if (this.target.xCurr < this.target.PositionX) {
      this.target.xCurr = this.target.PositionX
      this.target.atPosition = true
      if (!this.target.isBarrier) {
        this.game.timer = window.setTimeout(() => this.commitFail('timeout'), this.target.runAwayDelay)
      }
    }

    // Move Cat
    if (this.cat.CatX > GAME.defaultCatX) {
      this.cat.CatX -= this.target.atPosition ? Math.floor((this.game.movementSpeed / 3) * 2) : this.game.movementSpeed
    } else {
      this.cat.atPosition = true
    }

    if (this.cat.atPosition && this.target.atPosition) {
      setTimeout(() => (this.game.action = 'stay'), 0)
    }
  }

  private runAway = () => {
    if (this.target.nameLast == 'butterfly' || this.target.nameLast == 'bird') {
      this.target.xLast -= this.game.runAwaySpeed
      this.target.yLast -= this.target.nameLast == 'butterfly' ? Math.random() * 6 : 4
      return
    }

    if (this.target.nameLast == 'grasshopper') {
      this.target.xLast -= this.game.runAwaySpeed
      return
    }

    if (this.target.nameLast == 'mouse') {
      this.target.xLast += this.game.runAwaySpeed
      return
    }

    this.target.xLast -= this.cat.atPosition ? this.game.movementSpeed : Math.floor((this.game.movementSpeed / 2) * 3)
    return
  }

  private sceneReturn = () => {
    // Move Cat
    if (this.cat.CatX > GAME.defaultCatX) {
      this.cat.CatX -= this.game.movementSpeed
    } else {
      this.game.action = 'stay'
    }
  }

  // Renders one frame
  private render = () => {
    // Development time patch
    if (!this.cat.source) this.cat.source = this.resource.sprite.cat as GifObject
    performance.mark('beginRenderProcess')
    this.game.ctx!.clearRect(0, 0, CANVAS.width, CANVAS.height)
    if (!this.target.atPosition && (this.game.action == 'return' || this.game.action == 'scene')) {
      this.bgMotion.draw(this.cat.atPosition ? this.game.movementSpeed : Math.floor((this.game.movementSpeed / 2) * 3))
    }

    this.draw.drawTarget(this.target.nameCurr, this.target.xCurr, this.target.yCurr, this.target.heightCurr)

    if (this.game.definingTrajectory) this.defineTrajectory()

    switch (this.game.action) {
      case 'return':
        // this.sceneReturn()
        this.sceneChange()
        this.draw.drawCat(this.cat.source.image, this.cat.CatX, this.cat.CatY)
        break
      case 'scene':
        this.sceneChange()
        this.draw.drawCat(this.cat.source.image, this.cat.CatX, this.cat.CatY)
        break
      case 'run':
        this.draw.drawCat(this.cat.source.image, this.cat.CatX, this.cat.CatY)
        break
      case 'jump':
        this.defineJump()
        break
      default: //'stay'
        this.draw.drawCat(this.cat.source.frames[2].image, this.cat.CatX, this.cat.CatY)
    }
    this.fly.render()
    if (this.game.definingTrajectory || this.updateIsNeeded()) setTimeout(this.update, this.game.updateTime)
    // Performance meter
    performance.mark('endRenderProcess')
    if (GAME.meter) {
      const measure = performance.measure('measureRenderProcess', 'beginRenderProcess', 'endRenderProcess')
      const duration = Math.floor(measure.duration * 1000)
      if (duration > 0) this.meterStack.enqueue(duration)
      this.game.ctx!.fillStyle = 'black'
      this.game.ctx!.fillText(`mms/frame: ${this.meterStack.average(10)}`, 540, 18)
    }
  }

  private updateIsNeeded = (): boolean => {
    return this.game.action !== null && this.game.action !== 'stay'
  }

  // Main update function
  private update = (timer: number) => {
    if (!this.game.paused && this.game.ctx) {
      // Develpement time patch
      if (this.resource.sprite.cat && !this.resource.sprite.cat.loading) {
        this.render()
      } else {
        console.log('Waiting for GIF image')
        setTimeout(this.update, 500)
      }
    }
  }

  private levelPrepare = () => {
    // Developement time patch (React.StrictMode)
    if (this.game.action == 'scene') return

    window.clearTimeout(this.game.timer)
    const level = Math.min(Math.floor(Math.max(this.game.score, 0) / GAME.scorePerLevel), 5)
    this.showLevel(level)
    if (this.game.tooltip.firstTip) this.showTooltip(TOOLTIP.newGame)
    this.game.SPEED = 0.5 + level * 0.1
    const targets = DIFFICULTY_PER_LEVEL[0] // ToDo change to a level
    const rand = Math.floor(Math.random() * targets.length)
    this.target.nameLast = this.target.nameCurr
    this.target.heightLast = this.target.heightCurr
    this.target.xLast = this.target.xCurr
    this.target.yLast = this.target.yCurr
    this.target.xCurr = Math.floor(Math.max(this.cat.CatX + CANVAS.width / 2, CANVAS.width))
    this.target.yCurr = GAME.defaultTargetY
    this.target.nameCurr = targets[rand]
    this.target.isBarrier = BARRIER_LIST.includes(this.target.nameCurr)
    this.target.PositionX = this.target.isBarrier
      ? GAME.defaultTargetX
      : GAME.defaultTargetX + Math.floor(Math.random() * GAME.animalPositionDelta)
    this.target.heightCurr = this.target.isBarrier
      ? GAME.defaultTargetHeight + GAME.stepTargetHeight * level
      : GAME.defaultTargetHeight
    this.target.runAwayDelay = GAME.defaultRunAwayDelay - GAME.stepTargetDelay * level
    this.game.paused = false
    this.game.movementSpeed = 6
    this.game.fullJump = this.target.nameCurr == 'puddle' || ANIMAL_LIST.includes(this.target.nameCurr)
    this.cat.atPosition = false
    this.target.atPosition = false
    // console.log(`Level ${level}:`, {speed: this.game.SPEED, rand: `${rand}/${targets.length}`, target: this.target})

    if (!this.updateIsNeeded()) requestAnimationFrame(this.update)
    this.game.action = 'scene'
  }

  private canJump = (): boolean => {
    return !this.game.definingTrajectory && this.game.action !== 'jump'
  }

  private onkeydown = (event: KeyboardEvent) => {
    if (this.canJump() && event.code == 'Space') {
      this.prepareJumpStart()
    }
  }

  private onkeyup = (event: KeyboardEvent) => {
    if (this.game.definingTrajectory && event.code == 'Space') {
      this.prepareJumpEnd()
    }
    if (event.code == 'Escape') {
      this.pause(true)
    }
  }

  private touchstart = (event: MouseEvent | TouchEvent) => {
    event.preventDefault()
    if (event.target && event.target instanceof HTMLDivElement && event.target.ariaLabel) return
    if (this.canJump()) {
      this.prepareJumpStart()
    }
  }

  private touchend = (event: MouseEvent | TouchEvent) => {
    if (this.game.definingTrajectory) {
      this.prepareJumpEnd()
    }
  }

  private registerEvents = () => {
    window.addEventListener('keydown', this.onkeydown)
    window.addEventListener('keyup', this.onkeyup)
    window.addEventListener('touchstart', this.touchstart)
    window.addEventListener('touchend', this.touchend)
    window.addEventListener('mousedown', this.touchstart)
    window.addEventListener('mouseup', this.touchend)
  }

  private unRegister = () => {
    window.removeEventListener('keydown', this.onkeydown)
    window.removeEventListener('keyup', this.onkeyup)
    window.removeEventListener('touchstart', this.touchstart)
    window.removeEventListener('touchend', this.touchend)
    window.removeEventListener('mousedown', this.touchstart)
    window.removeEventListener('mouseup', this.touchend)
  }

  public start() {
    this.canvas = document.getElementById('game_canvas') as HTMLCanvasElement
    this.game.ctx = this.canvas.getContext('2d')
    this.draw = new Draw(this.game.ctx!)
    this.fly = new FlyingValues(this.game.ctx!)
    this.game.ctx!.font = '18px Arial'
    this.game.score = Number(store.getState().game.score)
    this.game.catched = { ...store.getState().game.catched }
    this.registerEvents()
    this.levelPrepare()
    this.showScore(this.game.score)
    this.setCatched(this.game.catched)
  }

  public stop() {
    this.unRegister()
    window.clearTimeout(this.game.timer)
  }

  public pause = (state: boolean) => {
    if (this.game.paused == state) return
    this.game.paused = state
    console.log(`Game: ${this.game.paused ? 'Pause' : 'Continue'}`)

    if (this.game.paused) {
      this.unRegister()
      this.setPauseVisible(true)
      window.clearTimeout(this.game.timer)
    } else {
      this.registerEvents()
      requestAnimationFrame(this.update)
    }
  }

  public static get(handlers?: Record<string, (value?: any) => void>) {
    if (Engine.__instance) {
      // Renew handlers
      if (handlers) {
        Engine.__instance.setPauseVisible = handlers.setPauseVisible
        Engine.__instance.handleGameOver = handlers.handleGameOver
        Engine.__instance.showLevel = handlers.setLevel
        Engine.__instance.showScore = handlers.setScore
        Engine.__instance.showCombo = handlers.setCombo
        Engine.__instance.setTooltip = handlers.setTooltip
        Engine.__instance.setCatched = handlers.setCatched
      }
      return Engine.__instance
    }
    if (handlers) Engine.__instance = new Engine(handlers)
    return Engine.__instance
  }
}
