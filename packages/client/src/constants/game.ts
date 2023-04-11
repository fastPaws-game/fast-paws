const canvas = {
  width: 800,
  height: 360,
}

const SpriteCat = {
  width: 100,
  height: 74,
  ar: 0.74,
}

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
const defaultTargetY = ActionPositionVertical
const defaultTargetHeight = 80
const stepTargetHeight = 10
const defaultTargetDelay = 8000 // The time after which the target will escape
const stepTargetDelay = 1000
const catchHeight = (defaultTargetX - defaultCatX) / 2

type Target = 'mouse' | 'grasshopper' | 'butterfly' | 'bird' | 'cactus' | 'puddle' | 'flowerpot' | 'gnome'

const score: Record<string, Record<'success' | 'fail', number>> = {
	butterfly:		{success: 10, fail: 0},
	grasshopper:	{success: 10, fail: 0},
	bird:					{success: 10, fail: -5},
	mouse:				{success: 10, fail: -10},

	puddle:				{success: 5, fail: -5},
	flowerpot:		{success: 5, fail: -5},
	gnome:				{success: 5, fail: -10},
	cactus:				{success: 5, fail: -20},
}

const game = {
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
	defaultTargetHeight,
	stepTargetHeight,
	defaultTargetDelay,
	stepTargetDelay,
	catchHeight,
}

export {canvas, game, score, SpriteCat}
