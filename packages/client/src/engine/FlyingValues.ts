// Not for review!
import { canvas, GAME, SpriteCat } from '../constants/game'

type Message = {
	text: string;
	color: string;
	x: number;
	y: number;
}

const delta = 100
const dx = - 2
const numberStartY = GAME.ActionPositionVertical - SpriteCat.height
const textStartY = numberStartY - delta

export default class Draw {
  private ctx: CanvasRenderingContext2D | null = null
	private paused = false
	private timer = 0
	private messages: Message[] = []

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

	public throw = (value: number) => {
		const text = (value < 0 ? '- ' : '+ ') + value.toString()
		const color = value < 0 ? 'red' : 'blue'
	}

	public pause = (state: boolean) => {
		this.paused = state
	}

	private add = (text: string, color: string) => {
		window.setInterval(this.render, 17)
	}

	private render = () => {}
}
