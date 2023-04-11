import {canvas, game, score} from '../constants/game'
import Draw from './Draw'
import Resource, { GifObject } from '../engine/ResourceLoader'

type Action = 'run' | 'stay' | 'jump' | 'path' | 'scene' | 'return' | null

export default class Engine {
  private SPEED = 0.5 // Game complexity refers to current level (Slow: 0.5 Max: 1)
  private updateTime = 17 / this.SPEED // Frame rait
  private action: Action = null
  private ctx: CanvasRenderingContext2D | null = null
  private hold = false
  private jumpHeight: number = game.jumpHeightMin
  private jumpStage = 0
  private trajectoryDirection = 1
  private CatX: number = game.defaultCatX
  private CatY: number = game.defaultCatY
	private targetX: number = this.CatX + canvas.width / 2
	private targetY: number = game.defaultTargetY
	private targetLastX: number = game.defaultTargetX
	private targetLastY: number = game.defaultTargetY
  private targetHeight: number = game.defaultTargetHeight
	private targetLastHeight: number = game.defaultTargetHeight
  private targetDelay: number = game.defaultTargetDelay
	private timer = 0
  private target = ''
  private targetLast = ''
	private movementSpeed = 6
	private successHeight = game.defaultTargetHeight * 1.375
	private success = false
	private isBarrier = false
	private fullJump = true
	private score: number
	private paused = false
	private cat: GifObject
  private draw: Draw
	private handlePause: () => void
	private handleGameOver: () => void
	private static _instance: Engine

  private constructor(handlers: Record<string, () => void>) {
		this.handlePause = handlers.handlePause
		this.handleGameOver = handlers.handleGameOver

		const canvas=document.getElementById("game_canvas") as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
    this.draw = new Draw(this.ctx!)

		this.cat = Resource.sprite.cat as GifObject
		this.score = game.initialScore // Get score from store
  }

	private setScore = (value: number) => {
		this.score += value
		console.log((value > 0 ? 'Success!' : 'Fail.') + ' Score:', this.score)
	}

	private commitFail = () => {
		if (this.score + score[this.target].fail < 0) {
			this.score = game.initialScore
			this.paused = true
			console.log('Game over')
			this.handleGameOver()
			return
		}
		this.hold = true
		this.success = false
		this.action = 'return'
		this.setScore(score[this.target].fail)
		if (!this.isBarrier) this.levelPrepare()
	}

	private commitSuccess = () => {
		this.setScore(score[this.target].success)
		if (!this.isBarrier) this.target = ''
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
        this.jumpHeight = game.jumpHeightMin
        this.trajectoryDirection = 1
        requestAnimationFrame(this.update)
      }, this.updateTime * 2)
    }
  }

  private onkeyup = (event: KeyboardEvent) => {
    if (this.hold && event.code == 'Space') {
      this.hold = false
      // this.action='stay';
      this.action = 'jump'
      this.jumpStage = -Math.PI
			this.success = (this.isBarrier && this.jumpHeight > this.successHeight) || Math.abs(this.jumpHeight - this.successHeight) < 10
      console.log('Jump height: ', this.jumpHeight, '/', this.successHeight, this.success)
    }
    if (event.code == 'Escape') {
			this.pause(true)
    }
  }

  private defineTrajectory = () => {
    this.jumpHeight += game.trajectoryStep * this.trajectoryDirection
    if (this.jumpHeight >= game.jumpHeightMax) this.trajectoryDirection = -1
    if (this.jumpHeight < game.jumpHeightMin) {
      // Stops jump request
      // this.trajectoryDirection = 1
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
		if (!this.fullJump && !this.success && i > -Math.PI / 2){
			this.commitFail()
		}
    if (i < 0) {
      this.CatX = game.defaultCatX + r + r * Math.cos(i)
      const y = this.CatY + r * Math.sin(i)
      const frameIndex = Math.floor(((i + Math.PI) / Math.PI) * 3)
      this.draw.drawCat(this.cat.frames[frameIndex].image, this.CatX, y)
    } else {
			this.success ? this.commitSuccess() : this.commitFail()
    }
    /*
			for (let i = -Math.PI; i < 0; i += step) {
				const x = this.CatX + r + r * Math.cos(i);
				const y = this.CatY + r * Math.sin(i);
				this.ctx!.fillRect(x, y, 2, 2);
			}
*/
  }

  private sceneChange = () => {
		// Move last target
		if (this.targetLast != ''){
			this.runAway()

			this.draw.drawTarget(this.targetLast, this.targetLastX, this.targetLastY, this.targetLastHeight, !this.success)
			if (this.targetLastX < 0 || this.targetLastX > canvas.width) this.targetLast=''
		}

		// Move current target
		this.targetX -= this.movementSpeed
		if (this.targetX <= game.defaultTargetX){
			this.action = 'stay'
			this.hold = false
			if (!this.isBarrier) {
				this.timer = window.setTimeout(this.commitFail, this.targetDelay)
			}
		}

		// Move Cat
		if (this.CatX > game.defaultCatX) {
			this.CatX -= 4
		} else if (this.targetLast != '') {
			// this.movementSpeed = 4
		}
	}

	private runAway = () => {
		if (this.targetLast == 'butterfly' || this.targetLast == 'bird'){
			this.targetLastX -= 6
			this.targetLastY -= this.target == 'bird' ? 4 : Math.random() * 6
			return
		}

		if (this.targetLast == 'grasshopper'){
			this.targetLastX -= 6
			return
		}

		if (this.targetLast == 'mouse'){
			this.targetLastX += 6
			return
		}

		this.targetLastX -= this.movementSpeed
		return
	}

	private sceneReturn = () =>{
			// Move Cat
			if (this.CatX > game.defaultCatX) {
				this.CatX -= 6
			} else {
				this.action = 'stay'
				this.hold = false
			}
	}

	private movingCat = () =>{
		this.draw.drawCat(this.cat.image, this.CatX, this.CatY)
		setTimeout(this.update, this.updateTime)
	}

  // Renders one frame
  private render = () => {
    if (!this.cat) this.cat = Resource.sprite.cat as GifObject // Development time patch

    this.ctx!.clearRect(0, 0, canvas.width, canvas.height)
    this.draw.drawTarget(this.target, this.targetX, this.targetY, this.targetHeight)

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
		const level = Math.min(Math.floor(Math.max(this.score, 0) / game.scorePerLevel), 5)
		this.SPEED = 0.5 + level * 0.1
		this.updateTime = 17 / this.SPEED
		const targets = Resource.difficulty[level]
		const rand = Math.floor(Math.random() * targets.length)
		this.targetLast = this.target
		this.targetLastHeight = this.targetHeight
		this.targetLastX = game.defaultTargetX
		this.targetLastY = game.defaultTargetY
		this.targetX = Math.max(this.CatX + canvas.width / 2, canvas.width)
		this.targetY = game.defaultTargetY
		this.target = targets[rand]
		this.isBarrier = Resource.barrier.includes(this.target)
		this.targetHeight = this.isBarrier ? game.defaultTargetHeight + game.stepTargetHeight * level : game.defaultTargetHeight
		this.targetDelay = game.defaultTargetDelay - game.stepTargetDelay * level
		this.action = 'scene'
		this.hold = true
		this.paused = false
		this.movementSpeed = 6
		this.isBarrier = Resource.barrier.includes(this.target)
		this.successHeight = this.isBarrier ? Math.floor(this.targetHeight * 1.2) : game.catchHeight
		this.fullJump = this.target=='puddle' || Resource.target.includes(this.target)
/* 
		console.log(`Level ${level}:`, {
			speed: this.SPEED,
			rand: `${rand}/${targets.length}`,
			target: this.target,
		})
 */
		requestAnimationFrame(this.update)
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

	public pause = (state: boolean)=>{
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
    if (Engine._instance) return Engine._instance
		if (handlers) Engine._instance = new Engine(handlers)
    return Engine._instance
  }
}
