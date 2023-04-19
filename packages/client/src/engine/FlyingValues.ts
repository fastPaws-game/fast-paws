// Not for review!
import { GAME, SpriteSize } from '../constants/game'

type Message = {
  text: string
  color: string
  X: number
  Y: number
  minY: number
}

const delta = 30
const dy = -2
const numStartY = GAME.actionPositionVertical - SpriteSize.cat.height
const txtStartY = numStartY - delta

export default class FlyingValues {
  private ctx: CanvasRenderingContext2D | null = null
  private messages: Message[] = []

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  public render = () => {
    if (this.messages.length > 0) {
      let needShift = false
      this.messages.forEach(message => {
        const { text, color, X, minY } = message
        message.Y += dy
        if (message.Y < minY) needShift = true
        this.ctx!.fillStyle = color
        this.ctx!.fillText(text, X, message.Y)
      })
      if (needShift) this.messages.shift()
    }
  }

  public throw = (value: number | string, multiplier: number, x: number, y?: number) => {
    let text = value.toString()
    let color = 'yellow'
    let Y = y || txtStartY
    if (typeof value == 'number') {
      if (value > 0) text = '+ ' + text
      color = value < 0 ? 'red' : 'green'
      Y = y || numStartY
    }
    if (multiplier > 1) text = text + ' x' + multiplier
    this.messages.push({ text, color, X: x, Y, minY: Y - delta })
  }
}
