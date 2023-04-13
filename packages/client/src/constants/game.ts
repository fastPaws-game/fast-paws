const canvas = {
  width: 800,
  height: 360,
}
export {canvas}

const SpriteCat = {
  width: 100,
  height: 74,
  aspectRatio: 0.74,
}
export {SpriteCat}

// Base game constants
const scorePerLevel = 100
const initialScore = 10	// Need to prevent 'Game over' after the first fail
const ActionPositionVertical = Math.floor(canvas.height * 0.93)
const shadowsEnable = false
const trajectoryStep = 2
const jumpHeightMin = Math.floor(SpriteCat.height / 1.5)
const jumpHeightMax = SpriteCat.height * 3
const defaultCatX = Math.floor(canvas.width / 3)
const defaultCatY = ActionPositionVertical
const defaultTargetX = canvas.width / 2
const victimPositionDelta = canvas.width / 8
const defaultTargetY = ActionPositionVertical
const defaultTargetHeight = 80
const stepTargetHeight = 10
const defaultTargetDelay = 8000 // The time after which the target will escape
const stepTargetDelay = 1000

export type TargetName = 'mouse' | 'grasshopper' | 'butterfly' | 'bird' | 'cactus' | 'puddle' | 'flowerpot' | 'gnome' | 'none'

const VICTIM_LIST: TargetName[] = ['mouse', 'grasshopper', 'butterfly', 'bird']
export {VICTIM_LIST}

const BARRIER_LIST: TargetName[] = ['cactus', 'puddle', 'flowerpot', 'gnome']
export {BARRIER_LIST}

const DIFFICULTY_PER_LEVEL: TargetName[][] = [
	['mouse', 'grasshopper', 'butterfly', 'bird', 'cactus', 'puddle', 'flowerpot', 'gnome'],	// Testing level 0
	['butterfly', 'puddle', 'flowerpot'],
	['butterfly', 'grasshopper', 'puddle', 'flowerpot'],
	['butterfly', 'grasshopper', 'puddle', 'flowerpot', 'gnome'],
	['grasshopper', 'mouse', 'puddle', 'flowerpot', 'gnome'],
	['grasshopper', 'mouse', 'bird', 'gnome', 'cactus'],
]
export {DIFFICULTY_PER_LEVEL}

export type ScoreType = 'success' | 'fail'
const TARGET_SCORE: Record<TargetName, Record<ScoreType, number>> = {
	none:					{success: 0, fail: 0},

	butterfly:		{success: 10, fail: 0},
	grasshopper:	{success: 10, fail: 0},
	bird:					{success: 10, fail: -5},
	mouse:				{success: 10, fail: -10},

	puddle:				{success: 5, fail: -5},
	flowerpot:		{success: 5, fail: -5},
	gnome:				{success: 5, fail: -10},
	cactus:				{success: 5, fail: -20},
}
export {TARGET_SCORE}

const GAME = {
	scorePerLevel,
	initialScore,
	ActionPositionVertical,
	shadowsEnable,
	trajectoryStep,
	jumpHeightMin,
	jumpHeightMax,
	defaultCatX,
	defaultCatY,
	defaultTargetX,
	defaultTargetY,
	victimPositionDelta,
	defaultTargetHeight,
	stepTargetHeight,
	defaultTargetDelay,
	stepTargetDelay,
}
export {GAME}
