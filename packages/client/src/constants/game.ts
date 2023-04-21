export const CANVAS = {
  width: 800,
  height: 360,
  get aspectRatio(): number {
    return this.height / this.width
  },
}

export const SpriteSize = {
  cat: {
    width: 100,
    height: 74,
    get aspectRatio(): number {
      return this.height / this.width
    },
  },
}

// Core game constants
export const GAME = {
  version: 20101008,
  scorePerLevel: 1000,
  initialScore: 20, // Need to prevent 'Game over' after the first fail
  catchRange: 10, // A range where an animal can be catched
  meter: true, //Performance meter
  actionPositionVertical: Math.floor(CANVAS.height * 0.88),
  shadowsEnable: false,
  trajectoryStep: 2,
  jumpHeightMin: Math.floor(SpriteSize.cat.height / 1.5),
  jumpHeightMax: SpriteSize.cat.height * 3,
  defaultCatX: Math.floor(CANVAS.width / 3),
  get defaultCatY(): number {
    return this.actionPositionVertical
  },
  defaultTargetX: CANVAS.width / 2,
  animalPositionDelta: CANVAS.width / 8,
  get defaultTargetY(): number {
    return this.actionPositionVertical
  },
  defaultTargetHeight: 80,
  stepTargetHeight: 10,
  defaultRunAwayDelay: 8000, // The time after which the target will escape
  stepTargetDelay: 1000,
  get versionName(): string {
    return getVersionName()
  },
}

export const getVersionName = (ver = GAME.version): string => {
  const releaseName = ['dev', 'alpha', 'beta', 'live']
  const release = Math.floor(ver / 10000000)
  const major = Math.floor(ver / 100000) - release * 100
  const minor = Math.floor((ver % 100000) / 1000)
  const patch = ver % 1000
  return `${releaseName[release] || releaseName[0]}.${major < 10 ? '0' + major : major}.${
    major < 10 ? '0' + minor : minor
  }.${patch}`
}

export type AnimalName = 'butterfly' | 'grasshopper' | 'bird' | 'mouse'

export type TargetName = AnimalName | 'cactus' | 'puddle' | 'flowerpot' | 'gnome' | 'none'

export const ANIMAL_LIST: TargetName[] = ['mouse', 'grasshopper', 'butterfly', 'bird']

export const BARRIER_LIST: TargetName[] = ['cactus', 'puddle', 'flowerpot', 'gnome']

export const DIFFICULTY_PER_LEVEL: TargetName[][] = [
  ['mouse', 'grasshopper', 'butterfly', 'bird', 'cactus', 'puddle', 'flowerpot', 'gnome'], // Testing level 0
  ['butterfly', 'puddle', 'flowerpot'],
  ['butterfly', 'grasshopper', 'puddle', 'flowerpot'],
  ['butterfly', 'grasshopper', 'puddle', 'flowerpot', 'gnome'],
  ['grasshopper', 'mouse', 'puddle', 'flowerpot', 'gnome'],
  ['grasshopper', 'mouse', 'bird', 'gnome', 'cactus'],
]

export const TARGET_SCORE: Record<TargetName, Record<'success' | 'fail', number>> = {
  none: { success: 0, fail: 0 },

  butterfly: { success: 10, fail: 0 },
  grasshopper: { success: 10, fail: 0 },
  bird: { success: 10, fail: -5 },
  mouse: { success: 10, fail: -10 },

  puddle: { success: 5, fail: -5 },
  flowerpot: { success: 5, fail: -5 },
  gnome: { success: 5, fail: -10 },
  cactus: { success: 5, fail: -20 },
}

type Tooltip = 'newGame' | 'firstAnimal' | 'firstBarrier' | 'firstTimeout'
export const TOOLTIP: Record<Tooltip, string> = {
  newGame: 'Hold space/tap to jump',
  firstAnimal: 'Need to jump on target',
  firstBarrier: 'Need to jump over the target',
  firstTimeout: 'The animal can run away',
}
