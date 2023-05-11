import { RootState } from '../index'

const getScore = (state: RootState) => state.game.score

export const gameSelectors = { getScore }
