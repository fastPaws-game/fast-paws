import { RootState } from '../index'

const getScore = (state: RootState) => state.game.score
const getCatched = (state: RootState) => state.game.catched

export const GameSelectors = {
  getScore,
  getCatched,
}
