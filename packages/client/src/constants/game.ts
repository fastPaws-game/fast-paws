export const canvas = {
  width: 800,
  height: 360,
}

export const SpriteSize = {
	cat: {
		width: 100,
		height: 74,
		aspectRatio: 0.74,
	}
}

// Core game constants
export const GAME = {
	scorePerLevel: 100,
	initialScore: 20,	// Need to prevent 'Game over' after the first fail
	actionPositionVertical: Math.floor(canvas.height * 0.93),
	shadowsEnable: false,
	trajectoryStep: 2,
	jumpHeightMin: Math.floor(SpriteSize.cat.height / 1.5),
	jumpHeightMax: SpriteSize.cat.height * 3,
	defaultCatX: Math.floor(canvas.width / 3),
	get defaultCatY(): number { return this.actionPositionVertical },
	defaultTargetX: canvas.width / 2,
	victimPositionDelta: canvas.width / 8,
	get defaultTargetY(): number { return this.actionPositionVertical },
	defaultTargetHeight: 80,
	stepTargetHeight: 10,
	defaultRunAwayDelay: 8000, // The time after which the target will escape
	stepTargetDelay: 1000,
}

export type TargetName = 'mouse' | 'grasshopper' | 'butterfly' | 'bird' | 'cactus' | 'puddle' | 'flowerpot' | 'gnome' | 'none'

export const VICTIM_LIST: TargetName[] = ['mouse', 'grasshopper', 'butterfly', 'bird']

export const BARRIER_LIST: TargetName[] = ['cactus', 'puddle', 'flowerpot', 'gnome']

export const DIFFICULTY_PER_LEVEL: TargetName[][] = [
	['mouse', 'grasshopper', 'butterfly', 'bird', 'cactus', 'puddle', 'flowerpot', 'gnome'],	// Testing level 0
	['butterfly', 'puddle', 'flowerpot'],
	['butterfly', 'grasshopper', 'puddle', 'flowerpot'],
	['butterfly', 'grasshopper', 'puddle', 'flowerpot', 'gnome'],
	['grasshopper', 'mouse', 'puddle', 'flowerpot', 'gnome'],
	['grasshopper', 'mouse', 'bird', 'gnome', 'cactus'],
]

export const TARGET_SCORE: Record<TargetName, Record<'success' | 'fail', number>> = {
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

