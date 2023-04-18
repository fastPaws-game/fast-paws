import Engine from './Engine'
import { GAME, TOOLTIP } from '../constants/game'

let gameOver = false
let pause = false
let level = 100
let score = 100
let tooltip = ''
let catched = { mouse: 0, grasshopper: 0, butterfly: 0, bird: 0 }

// Can not be tested cause fires on game over
const handleGameOver = () => {
  gameOver = true
}

const setPauseVisible = () => {
  pause = true
}

const setLevel = (value: number) => {
  level = value
}

const setScore = (value: number) => {
  score = value
}

const setTooltip = (value: string) => {
  tooltip = value
}
// Can not be tested cause fires in game progress
const setCatched = (value: Record<string, number>) => {
  catched = { ...catched, ...value }
}

const engine = Engine.get({ setPauseVisible, handleGameOver, setLevel, setScore, setTooltip, setCatched })

engine.start()
engine.pause(true)
engine.stop()

// Приведённые условия не являются методами jest. Это я написал что и с чем сравнивать
if (pause) console.log('success')
if (level === 0) console.log('success')
if (score === GAME.initialScore) console.log('success')
if (tooltip === TOOLTIP.newGame) console.log('success')
