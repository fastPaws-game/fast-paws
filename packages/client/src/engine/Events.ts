import { TGame } from './@engine'

export class Events {
  private game: TGame
  private prepareJumpStart: () => void
  private prepareJumpEnd: () => void
  private pause: (state: boolean) => void
  private static __instance: Events

  constructor(game: TGame, prepareJumpStart: () => void, prepareJumpEnd: () => void, pause: (state: boolean) => void) {
    this.game = game
    this.prepareJumpStart = prepareJumpStart
    this.prepareJumpEnd = prepareJumpEnd
    this.pause = pause
    if (Events.__instance) return Events.__instance
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

  public registerEvents = () => {
    window.addEventListener('keydown', this.onkeydown)
    window.addEventListener('keyup', this.onkeyup)
    window.addEventListener('touchstart', this.touchstart)
    window.addEventListener('touchend', this.touchend)
    window.addEventListener('mousedown', this.touchstart)
    window.addEventListener('mouseup', this.touchend)
  }

  public unRegisterEvents = () => {
    window.removeEventListener('keydown', this.onkeydown)
    window.removeEventListener('keyup', this.onkeyup)
    window.removeEventListener('touchstart', this.touchstart)
    window.removeEventListener('touchend', this.touchend)
    window.removeEventListener('mousedown', this.touchstart)
    window.removeEventListener('mouseup', this.touchend)
  }
}
